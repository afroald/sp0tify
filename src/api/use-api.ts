import { useEffect, useMemo, useState } from 'react';
import { useAuthorizationContext } from '../authorization/authorization-context';

export const useApi = <T>(
  url: string,
  params: Record<string, string>,
): [T | null, boolean, Error | null] => {
  const { getAccessToken } = useAuthorizationContext();
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false);
      });
  }, [getAccessToken, fullUrl]);

  return [result, isLoading, error];
};
