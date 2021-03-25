import React from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Commit, Repository} from "./graphql";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

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
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Last updated: {moment(updatedAt).fromNow()}
                    {target?.abbreviatedOid}
                    {target?.author?.name}
                    {target?.message}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {defaultBranchRef?.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RepositoryComponent;