import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthorizationProvider } from './authorization/authorization-context';
import { Router } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('kapot');
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: 'black',
        color: 'white',
      },
    },
  },
});

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthorizationProvider>
        <Router />
      </AuthorizationProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
