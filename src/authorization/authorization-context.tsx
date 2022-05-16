import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AccessToken } from './access-token';
import { AuthorizationManager } from './authorization-manager';

interface AuthorizationContextInterface {
  manager: AuthorizationManager;
  authorization: AuthorizationState;
  getAccessToken: () => Promise<AccessToken>;
}

const AuthorizationContext =
  createContext<AuthorizationContextInterface | null>(null);

export const useAuthorizationContext = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error(
      'Cannot use authorization context without provider in render tree',
    );
  }
  return context;
};

export enum AuthorizationState {
  Unknown,
  Authorized,
  NotAuthorized,
}

interface AuthenticationProviderProps {
  children?: ReactNode;
}

export const AuthorizationProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const { current: manager } = useRef(
    new AuthorizationManager(
      import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      window.localStorage,
    ),
  );

  const [authorization, setAuthorization] = useState(
    AuthorizationState.Unknown,
  );

  const getAccessToken = useCallback(
    () =>
      manager
        .getAccessToken()
        .then((token) => {
          setAuthorization(AuthorizationState.Authorized);
          return token;
        })
        .catch((error) => {
          console.log(
            'Removing authorization because no access token is available',
          );
          setAuthorization(AuthorizationState.NotAuthorized);
          throw error;
        }),
    [manager],
  );

  const value = useMemo(
    () => ({
      manager,
      authorization,
      getAccessToken,
    }),
    [manager, authorization, getAccessToken],
  );

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const RequireAuth = () => {
  const { authorization, getAccessToken } = useAuthorizationContext();
  const location = useLocation();

  useEffect(() => {
    if (
      [AuthorizationState.Unknown, AuthorizationState.NotAuthorized].includes(
        authorization,
      )
    ) {
      getAccessToken().catch((error) => {
        console.error(error);
      });
    }
  }, [authorization, getAccessToken]);

  if (authorization === AuthorizationState.NotAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authorization === AuthorizationState.Authorized) {
    return <Outlet />;
  }

  return <div>loading</div>;
};
