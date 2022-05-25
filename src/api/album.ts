import { useEffect, useState } from 'react';
import { AccessToken } from '../authorization/access-token';
import { useAuthorizationContext } from '../authorization/authorization-context';
import { apiFetch } from './use-api';

interface ApiAlbumTracksResponse {
  href: string;
  items: {
    artists: {
      external_urls: Record<string, string>;
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    preview_url: string;
    track_number: number;
    type: 'track';
    uri: string;
  }[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

const fetchAlbumTracks = async ({
  token,
  albumId,
  offset = 0,
}: {
  token: AccessToken;
  albumId: string;
  offset?: number;
}): Promise<ApiAlbumTracksResponse['items']> => {
  const url = new URL(`https://api.spotify.com/v1/albums/${albumId}/tracks`);
  url.searchParams.append('limit', '50');

  if (offset !== undefined) {
    url.searchParams.append('offset', String(offset));
  }

  const response = await apiFetch<ApiAlbumTracksResponse>(token, url);

  return [
    ...response.items,
    ...(response.next
      ? await fetchAlbumTracks({ token, albumId, offset: offset + 50 })
      : []),
  ];
};

export const useAlbumTracks = ({
  albumId,
}: {
  albumId: string;
}): [ApiAlbumTracksResponse['items'] | null, boolean, Error | null] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<ApiAlbumTracksResponse['items'] | null>(
    null,
  );

  useEffect(() => {
    setIsPending(true);
    getAccessToken()
      .then((token) => fetchAlbumTracks({ token, albumId }))
      .then((albums) => {
        setResult(albums);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getAccessToken, albumId]);

  return [result, isPending, error];
};
