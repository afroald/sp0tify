import { useEffect, useState } from 'react';
import { AccessToken } from '../authorization/access-token';
import { useAuthorizationContext } from '../authorization/authorization-context';
import { apiFetch } from './use-api';

export interface Artist {
  external_urls: Record<string, string>;
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

interface ApiFollowingResponse {
  artists: {
    href: string;
    items: Artist[];
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
}): Promise<Artist[]> => {
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
  Artist[] | null,
  boolean,
  Error | null,
] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<Artist[] | null>(null);

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
