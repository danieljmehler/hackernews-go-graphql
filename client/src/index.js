import React from 'react';
import './styles/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

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

// 3
const client = new ApolloClient({
  link: httpLink,
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
