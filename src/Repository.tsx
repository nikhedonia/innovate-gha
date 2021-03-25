import React from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Commit, Repository} from "./graphql";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Workflow from "./Workflow";

export type RepositoryProps = {
    repository: Repository
};

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const workflows = [
    {
        "id": 161335,
        "node_id": "MDg6V29ya2Zsb3cxNjEzMzU=",
        "name": "CI",
        "path": ".github/workflows/blank.yaml",
        "state": "active",
        "created_at": "2020-01-08T23:48:37.000-08:00",
        "updated_at": "2020-01-08T23:50:21.000-08:00",
        "url": "https://api.github.com/repos/octo-org/octo-repo/actions/workflows/161335",
        "html_url": "https://github.com/octo-org/octo-repo/blob/master/.github/workflows/161335",
        "badge_url": "https://github.com/octo-org/octo-repo/workflows/CI/badge.svg"
    },
    {
        "id": 269289,
        "node_id": "MDE4OldvcmtmbG93IFNlY29uZGFyeTI2OTI4OQ==",
        "name": "Linter",
        "path": ".github/workflows/linter.yaml",
        "state": "active",
        "created_at": "2020-01-08T23:48:37.000-08:00",
        "updated_at": "2020-01-08T23:50:21.000-08:00",
        "url": "https://api.github.com/repos/octo-org/octo-repo/actions/workflows/269289",
        "html_url": "https://github.com/octo-org/octo-repo/blob/master/.github/workflows/269289",
        "badge_url": "https://github.com/octo-org/octo-repo/workflows/Linter/badge.svg"
    }
]

function RepositoryComponent({repository}: RepositoryProps) {
    const classes = useStyles();
    const {name, updatedAt, defaultBranchRef} = repository;
    const target = defaultBranchRef?.target as Commit;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    <b> {defaultBranchRef?.name}</b> updated <b>{moment(updatedAt).fromNow()}</b>
                    {target?.author ? <span>by <b>{target?.author?.name}</b></span> : null}
                </Typography>
                <Typography className={classes.title} color="textSecondary" component="p" gutterBottom>
                    {target?.message} ({target?.abbreviatedOid})
                </Typography>
                <div>
                    {workflows.map(workflow =>
                        <Workflow workflow={workflow}/>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default RepositoryComponent;