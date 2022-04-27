import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthorizationProvider } from './authorization/authorization-context';
import { Router } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('kapot');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthorizationProvider>
        <Router />
      </AuthorizationProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
