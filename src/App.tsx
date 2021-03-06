import "./App.css";
import React, {useState} from "react";
import {useGetReposQuery, useGetViewerQuery, Repository} from "./graphql";
import RepositoryComponent from "./Repository";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import OrgPicker from "./OrgPicker";


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

function Repos({org}: {org:string}) {
  const { loading, data } = useGetReposQuery({variables:{org}});
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
    {!loading && data?.organization?.repositories?.nodes?.map((repository, i) =>
        repository ? <Grid item xs={12} sm={6}>
          <RepositoryComponent owner={org} repository={repository as Repository} key={i}/>
        </Grid> : null
    )}
    </Grid>
  );
}

function App() {
  const [org, setOrg] = useState('');

  const classes = useStyles();
  return (
    <div>
      <Typography variant="h3" gutterBottom>Github Actions Dashboard</Typography>
      <OrgPicker onLoad={setOrg} />
      <div className={classes.root}>
        {(org!=='')? <Repos org={org} /> : null}
      </div>
    </div>
  );
}

export default App;
