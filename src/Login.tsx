import { Button } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthorizationContext } from './authorization/authorization-context';

export const Login = () => {
  const auth = useAuthorizationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useCallback(() => {
    setIsLoading(true);
    auth.manager
      .request()
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [auth]);

  return (
    <div>
      {errorMessage ? <pre>Error: {errorMessage}</pre> : null}
      <Button onClick={login} colorScheme="green" isLoading={isLoading}>
        Login
      </Button>
    </div>
  );
};

export const LoginCallback = () => {
  const auth = useAuthorizationContext();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    auth.manager
      .processAuthCode()
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return auth.manager.isAuthorized ? (
    <Navigate to="/" />
  ) : (
    <div>
      {errorMessage ? <pre>Error: {errorMessage}</pre> : null}
      <Button colorScheme="green" isLoading={isLoading} loadingText="Checking">
        Login
      </Button>
    </div>
  );
};
