import 'fomantic-ui-css/semantic.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthenticationProvider } from './AuthenticationContext';
import Router from './Router';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('kapot');
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <Router />
    </AuthenticationProvider>
  </React.StrictMode>,
);
