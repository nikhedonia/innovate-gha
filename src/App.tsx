import "./App.css";
import React, { useEffect, useState } from "react";
import {useGetReposQuery, useGetOrgsQuery, useGetViewerQuery, Repository} from "./graphql";
import RepositoryComponent from "./Repository";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Card } from "@material-ui/core";


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

function Repos({org}: {org: string}) {
  const { data } = useGetReposQuery();
  return 
}

function App() {
  const { loading, error, networkStatus } = useGetViewerQuery();
  const classes = useStyles();
  const [org, setOrg] = useState<Org|null>(null);
  return (
    <div>
      <h1> Fullstack Apollo Template </h1>
      <div>
        <div>
          <OrgPicker onLoad={setOrg} />
          <Repos org={org} />
      </div>
    </div>
  );
}

export default App;
