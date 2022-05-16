import { useEffect, useState } from 'react';

type PromiseFn<T> = (props: { signal?: AbortSignal }) => Promise<T>;

export const useAsync = <T>(promiseFn: PromiseFn<T>) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {}, []);
};
