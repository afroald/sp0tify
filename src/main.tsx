import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthenticationProvider } from './AuthenticationContext';
import Router from './Router';
import { ChakraProvider } from '@chakra-ui/react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('kapot');
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthenticationProvider>
        <Router />
      </AuthenticationProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
