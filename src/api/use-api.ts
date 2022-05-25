import { useEffect, useMemo, useState } from 'react';
import { AccessToken } from '../authorization/access-token';
import { useAuthorizationContext } from '../authorization/authorization-context';

export interface PaginatedResponse<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export const useApi = <T>(
  url: string,
  params: Record<string, string>,
): [T | null, boolean, Error | null] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<T | null>(null);

  const fullUrl = useMemo(() => {
    const urlBuilder = new URL(url);
    for (const [name, value] of Object.entries(params)) {
      urlBuilder.searchParams.append(name, value);
    }
    return String(urlBuilder);
  }, [url, params]);

  useEffect(() => {
    setIsPending(true);
    getAccessToken()
      .then((token) => {
        return fetch(String(fullUrl), {
          headers: new Headers({
            Authorization: String(token),
          }),
        });
      })
      .then((response) => response.json())
      .then((result) => {
        setResult(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getAccessToken, fullUrl]);

  return [result, isPending, error];
};

export const apiFetch = <T>(
  token: AccessToken,
  url: URL,
  body?: string,
  signal?: AbortSignal,
): Promise<T> =>
  fetch(String(url), {
    headers: new Headers({
      Authorization: String(token),
    }),
    body,
    signal,
  }).then((response) => response.json());
