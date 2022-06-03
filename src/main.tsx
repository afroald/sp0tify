import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ObjectivProvider, ReactTracker } from '@objectiv/tracker-react';
import { DebugTransport } from '@objectiv/transport-debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthorizationProvider } from './authorization/authorization-context';
import { PlaybackProvider } from './playback/playback-context';
import { Router } from './router';

const tracker = new ReactTracker({
  applicationId: 'sp0tify',
  transport: new DebugTransport(),
});

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
    <ObjectivProvider tracker={tracker}>
      <ChakraProvider theme={theme}>
        <AuthorizationProvider>
          <PlaybackProvider>
            <Router />
          </PlaybackProvider>
        </AuthorizationProvider>
      </ChakraProvider>
    </ObjectivProvider>
  </React.StrictMode>,
);
