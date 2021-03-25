import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import App from "./App";

const token = process.env.REACT_APP_GITHUB_TOKEN || '';

const authorization = `Bearer ${token}`;

const cache = new InMemoryCache();
// @ts-ignore
window.cache = cache;
const link = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization,
  },
});

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

export default App;
