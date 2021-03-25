import "./App.css";

import React from "react";
import { useGetViewerQuery } from "./graphql";
import Button from '@material-ui/core/Button';
import Repository, {RepositoryProps, RepositoryType} from "./Repository";
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

const repositories: Array<RepositoryType> = [
    {
      name: "NewDay.CardPlatform.Example1",
      updatedAt: new Date(),
      workflows: []
    },
    {
      name: "NewDay.CardPlatform.Example2",
      updatedAt: new Date(),
      workflows: []
    },
    {
      name: "NewDay.CardPlatform.Example3",
      updatedAt: new Date(),
      workflows: []
    },
    {
      name: "NewDay.CardPlatform.Example4",
      updatedAt: new Date(),
      workflows: []
    }
  ];

function App() {
  const { data, loading, error, networkStatus } = useGetViewerQuery();
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
            {repositories.map((repository: RepositoryType) =>
              <Grid item xs={12} sm={6}>
                <Repository repository={repository}/>
              </Grid>
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
