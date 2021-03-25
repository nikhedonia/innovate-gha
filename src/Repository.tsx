import React from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Commit, Repository} from "./graphql";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {Accordion} from "@material-ui/core";

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
            </CardContent>
        </Card>
    );
}

export default RepositoryComponent;