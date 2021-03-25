import React, { ReactNode, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {schema, resolvers}  from './extensions';
import App from "./App";

interface ProviderProps {
  children: ReactNode
} 

function Provider({children}: ProviderProps) {
  const [token, setToken] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); 

  if (token !== "") {
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
      typeDefs: schema,
      resolvers
    });

    return (
      <ApolloProvider client={client} >
        {children}
      </ApolloProvider>
    )
  }

  return (
    <div>
    <label>
      SignUp with your Personal Github Token
    </label>
    <input ref={inputRef} type="password" name="github_token"/>
    <button type="submit" onClick={()=>{
      setToken(inputRef?.current?.value || "")
    }}> Login </button>
  </div>
  )
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default App;
