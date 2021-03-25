import React from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export type RepositoryProps = {
    repository: RepositoryType
}

export type RepositoryType = {
    name: string,
    updatedAt: Date,
    workflows: Array<WorkflowProps>
}

type WorkflowProps = {
    name: string,
    state: string,
    badge_url: string
}

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

function Repository({repository}: RepositoryProps) {
    const classes = useStyles();
    const {name} = repository;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Repository;