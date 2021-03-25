import "./App.css";

import React from "react";
import { useGetViewerQuery } from "./graphql";

const hasToken = process.env.REACT_APP_GITHUB_TOKEN;

const networkStatusMessage = (status: number) => {
  switch (status) {
    case 1:
      return "loading";
    case 2:
      return "setting variables";
    case 3:
      return "fetching more";
    case 4:
      return "refetching";
    case 6:
      return "polling";
    case 7:
      return "ready";
    case 8:
      return "error";
    default:
      return "unknown status";
  }
};

function App() {
  const { data, loading, error, networkStatus } = useGetViewerQuery();
  return (
    <div className="App">
      <h1> Fullstack Apollo Template </h1>
      <div>
        <p>
          If you see this text you've successfully installed the
          fullstack-apollo react template This demo will try to display the
          github user of the provided token. You can provide a token via:
          REACT_APP_GITHUB_TOKEN=YOUR_TOKEN
        </p>
        <div>
          <h2> Status Overview </h2>
          <ul>
            <li> {hasToken ? "token has been set" : "no token provided"} </li>
            <li> Network Status: {networkStatusMessage(networkStatus)} </li>
            <li> loading: {loading ? "true" : "false"} </li>
            <li> error: {error ? "true" : "false"} </li>
            <li> hasData: {data ? "true" : "false"} </li>
          </ul>
          <h3>Query Result</h3>
          <code>
            <pre>{
              loading
                ? "loading"
                : JSON.stringify(error ? error: data, null, 2)
            }</pre>
          </code>
        </div>
      </div>
    </div>
  );
}

export default App;
