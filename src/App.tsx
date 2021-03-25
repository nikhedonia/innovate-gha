import "./App.css";

import React from "react";
import {useGetReposQuery, useGetViewerQuery, Repository} from "./graphql";
import Button from '@material-ui/core/Button';
import RepositoryComponent, {RepositoryProps} from "./Repository";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const { loading, error, networkStatus } = useGetViewerQuery();
  const { data } = useGetReposQuery();
  const classes = useStyles();
  return (
    <div>
      <h1> Fullstack Apollo Template </h1>
      <div>
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
          <div className={classes.root}>
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={2}
          >
            {!loading && data?.organization?.repositories?.nodes?.map((repository) =>
                repository ? <Grid item xs={12} sm={6}>
                  <RepositoryComponent repository={repository as Repository}/>
                </Grid> : null
            )}
          </Grid>
          </div>
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
