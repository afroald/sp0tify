import { useEffect, useState } from 'react';
import { AccessToken } from '../authorization/access-token';
import { useAuthorizationContext } from '../authorization/authorization-context';
import { AlbumGroup, AlbumType, ReleaseDatePrecision } from './album';
import { ImageCollection } from './image';
import { apiFetch } from './use-api';

interface ApiArtistReponse {
  external_urls: Record<string, string>;
  followers: {
    total: number;
    href: string | null;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImageCollection;
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

const fetchArtist = async ({
  token,
  artistId,
}: {
  token: AccessToken;
  artistId: string;
}): Promise<ApiArtistReponse> => {
  const url = new URL(`https://api.spotify.com/v1/artists/${artistId}`);
  return apiFetch(token, url);
};

export const useArtist = ({
  artistId,
}: {
  artistId: string;
}): [ApiArtistReponse | null, boolean, Error | null] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<ApiArtistReponse | null>(null);

  useEffect(() => {
    setIsPending(true);
    getAccessToken()
      .then((token) => fetchArtist({ token, artistId }))
      .then((artist) => {
        setResult(artist);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getAccessToken, artistId]);

  return [result, isPending, error];
};

interface ApiFollowingResponse {
  artists: {
    href: string;
    items: {
      external_urls: Record<string, string>;
      followers: {
        href: string | null;
        total: number;
      };
      genres: string[];
      href: string;
      id: string;
      images: ImageCollection;
      name: string;
      popularity: number;
      type: 'artist';
      uri: string;
    }[];
    limit: number;
    next: string;
    cursors: {
      after: string;
    };
    total: number;
  };
}

const fetchFollowedArtists = async ({
  token,
  after,
}: {
  token: AccessToken;
  after?: string;
}): Promise<ApiFollowingResponse['artists']['items']> => {
  const url = new URL('https://api.spotify.com/v1/me/following');
  url.searchParams.append('type', 'artist');
  url.searchParams.append('limit', '50');

  if (after) {
    url.searchParams.append('after', after);
  }

  const { artists } = await apiFetch<ApiFollowingResponse>(token, url);

  return [
    ...artists.items,
    ...(artists.cursors.after
      ? await fetchFollowedArtists({
          token,
          after: artists.cursors.after,
        })
      : []),
  ];
};

export const useFollowedArtists = (): [
  ApiFollowingResponse['artists']['items'] | null,
  boolean,
  Error | null,
] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<
    ApiFollowingResponse['artists']['items'] | null
  >(null);

  useEffect(() => {
    setIsPending(true);
    getAccessToken()
      .then((token) => fetchFollowedArtists({ token }))
      .then((artists) => {
        setResult(artists);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getAccessToken]);

  return [result, isPending, error];
};

interface ApiArtistsAlbumsResponse {
  href: string;
  items: {
    album_group: AlbumGroup;
    album_type: AlbumType;
    artists: {
      external_urls: Record<string, string>;
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }[];
    available_markets: string[];
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: ImageCollection;
    name: string;
    release_date: string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks: number;
    type: string;
    uri: string;
  }[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

const fetchArtistsAlbums = async ({
  token,
  artistId,
  groups = ['album', 'single'],
  offset = 0,
}: {
  token: AccessToken;
  artistId: string;
  groups?: AlbumGroup[];
  offset?: number;
}): Promise<ApiArtistsAlbumsResponse['items']> => {
  const url = new URL(`https://api.spotify.com/v1/artists/${artistId}/albums`);
  url.searchParams.append('limit', '50');
  url.searchParams.append('offset', String(offset));
  url.searchParams.append('include_groups', groups.join(','));

  const response = await apiFetch<ApiArtistsAlbumsResponse>(token, url);

  return [
    ...response.items,
    ...(response.next
      ? await fetchArtistsAlbums({ token, artistId, offset: offset + 50 })
      : []),
  ];
};

export const useArtistsAlbums = ({
  artistId,
}: {
  artistId: string;
}): [ApiArtistsAlbumsResponse['items'] | null, boolean, Error | null] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<
    ApiArtistsAlbumsResponse['items'] | null
  >(null);

  useEffect(() => {
    setIsPending(true);
    getAccessToken()
      .then((token) => fetchArtistsAlbums({ token, artistId }))
      .then((albums) => {
        setResult(albums);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getAccessToken, artistId]);

  return [result, isPending, error];
};
