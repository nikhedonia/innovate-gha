import "./App.css";
import React from "react";
import {useGetReposQuery, useGetViewerQuery, Repository} from "./graphql";
import RepositoryComponent from "./Repository";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";


const hasToken = process.env.REACT_APP_GITHUB_TOKEN;


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
        <Typography variant="h3" gutterBottom>Github Actions Dashboard</Typography>
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
  );
}

export default App;
