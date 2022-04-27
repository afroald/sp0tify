import { createContext, ReactNode, useContext, useMemo, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthorizationManager } from './authorization-manager';

// http://localhost:3000/login/callback?code=AQA3JN7ycVwI5npY-7XjLnJIoKk8_R3k0ZnEEyM5oKr5dq-5_05bivZYUuQx2Iz4UZZ5seSSG29sF0kftPNxM9IyBZASkYd1AB5ZRFJdqLGRp2jIRxVdWu0mWUiQUfJ6Ry_r4VvZBsCzRRDfH8CGuZPK3pCl118n3Llipzf1mFWoSARkwJ20W33MoWOuWnv-hlgBnAxxm3L9x-e5pW3TjL0dSRYEy5J-Hio0H1vnkMjM0ziVRoriKlje_BZ9eZlD0QJuusQ7L7MUFo4O1S2Z-O2JvOO7LeTUkCPunTaZhg&state=cXS0qdUaXsdclipYq-dQMaSqsIQQi4IPJ4dZ1kPM2ac

interface AuthorizationContextInterface {
  manager: AuthorizationManager;
}

/* eslint-disable @typescript-eslint/no-empty-function */
const AuthorizationContext =
  createContext<AuthorizationContextInterface | null>(null);
/* eslint-enable */

export const useAuthorizationContext = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error(
      'Cannog use authorization context without provider in render tree',
    );
  }
  return context;
};

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

  const value = useMemo(
    () => ({
      manager,
    }),
    [manager],
  );

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

interface RequireAuthProps {
  children?: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuthorizationContext();
  const location = useLocation();

  if (!auth.manager.isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
