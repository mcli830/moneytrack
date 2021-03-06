require('newrelic')

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from  'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';

// import gql from 'graphql-tag';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_URI
});

// const authLink = new ApolloLink((operation, forward) => {
//   console.log(localStorage.getItem('graphcoolToken'))
//   const token = localStorage.getItem('graphcoolToken');
//   const authorizationHeader = token ? `Bearer ${token}` : null;
//   operation.setContext({
//     headers: {
//       authorization: authorizationHeader
//     }
//   });
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('graphcoolToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache() //.restore(window.__APOLLO_STATE__)
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
