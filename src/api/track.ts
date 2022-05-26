import { useEffect, useState } from 'react';
import { AccessToken } from '../authorization/access-token';
import { useAuthorizationContext } from '../authorization/authorization-context';
import { AlbumGroup, AlbumType, ReleaseDatePrecision } from './album';
import { ImageCollection } from './image';
import { apiFetch } from './use-api';

interface ApiGetTrackResponse {
  album: {
    album_type: AlbumType;
    total_tracks: number;
    available_markets: string[];
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: ImageCollection;
    name: string;
    release_date: string;
    release_date_precision: ReleaseDatePrecision;
    restrictions: Record<string, string>;
    type: 'album';
    uri: string;
    album_group: AlbumGroup;
    artists: {
      external_urls: Record<string, string>;
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }[];
  };
  artists: {
    external_urls: Record<string, string>;
    followers: {
      href: string;
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
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Record<string, string>;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: unknown;
  restrictions: Record<string, string>;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}

const fetchTrack = ({
  token,
  id,
}: {
  token: AccessToken;
  id: string;
}): Promise<ApiGetTrackResponse> => {
  const url = new URL(`https://api.spotify.com/v1/tracks/${id}`);
  return apiFetch(token, url);
};

export const useTrack = ({
  id,
}: {
  id: string | null;
}): [ApiGetTrackResponse | null, boolean, Error | null] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<ApiGetTrackResponse | null>(null);

  useEffect(() => {
    if (id === null) {
      return;
    }

    setIsPending(true);
    getAccessToken()
      .then((token) => fetchTrack({ token, id }))
      .then((artist) => {
        setResult(artist);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getAccessToken, id]);

  return [result, isPending, error];
};
