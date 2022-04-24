import { createContext, ReactNode, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface AuthenticationContextInterface {
  isAuthenticated: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextInterface>({
  isAuthenticated: false,
});

export const useAuthenticationContext = () => useContext(AuthenticationContext);

interface AuthenticationProviderProps {
  children?: ReactNode;
}

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps) => (
  <AuthenticationContext.Provider value={{ isAuthenticated: false }}>
    {children}
  </AuthenticationContext.Provider>
);

interface RequireAuthProps {
  children?: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuthenticationContext();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
