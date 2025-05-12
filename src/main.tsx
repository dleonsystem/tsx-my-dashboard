/**
 * @fileoverview Entry point for the React application. This file sets up the root rendering
 * process, wraps the application with necessary providers, and ensures proper initialization
 * of dependencies such as Apollo Client and internationalization (i18n).
 *
 * @module main
 */

 /**
  * Renders the React application into the DOM. The application is wrapped with the following providers:
  * 
  * - `StrictMode`: Helps identify potential problems in the application by enabling additional checks and warnings.
  * - `ApolloProvider`: Provides the Apollo Client instance to enable GraphQL queries and mutations throughout the app.
  * - `AuthProvider`: Supplies authentication context to manage user authentication state.
  * 
  * Additionally, the i18n configuration is imported to ensure internationalization is initialized before rendering the app.
  *
  * @see https://react.dev/docs/strict-mode
  * @see https://www.apollographql.com/docs/react/api/react/hooks/#apolloprovider
  * @see https://reactjs.org/docs/context.html
  */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './api/apolloClient';
import { AuthProvider } from './context/AuthContext';
import './i18n'; // Importar antes de renderizar la App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
