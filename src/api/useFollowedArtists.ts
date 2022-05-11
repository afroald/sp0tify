import { useApi } from './use-api';

interface Artist {
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

export const useFollowedArtists = (): [
  Artist[] | null,
  boolean,
  Error | null,
] => {
  const [result, isLoading, error] = useApi<ApiFollowingResponse>(
    'https://api.spotify.com/v1/me/following',
    {
      type: 'artist',
      limit: '50',
    },
  );

  return [result ? result.artists.items : null, isLoading, error];
};
