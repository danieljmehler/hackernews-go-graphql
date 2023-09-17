import React from 'react';
import './styles/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AUTH_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';


// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/query'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? token : ''
    }
  };
});

// 3
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// 4
const container = document.getElementById('root');
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
