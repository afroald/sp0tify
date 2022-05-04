import { Button } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  AuthorizationState,
  useAuthorizationContext,
} from './authorization/authorization-context';

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
  const { manager, authorization } = useAuthorizationContext();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (manager.isProcessingAuthCode) {
      return;
    }

    manager
      .processAuthCode()
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [manager]);

  if (errorMessage) {
    return (
      <div>
        <pre>Error: {errorMessage}</pre>
        <Link to="/login">Try again</Link>
      </div>
    );
  }

  if (authorization === AuthorizationState.Authorized) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Button colorScheme="green" isLoading={isLoading} loadingText="Checking">
        Login
      </Button>
    </div>
  );
};
