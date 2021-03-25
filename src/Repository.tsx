import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Commit, Repository} from "./graphql";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Workflow from "./Workflow";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Octokit} from "@octokit/core";
import qs from 'querystring';

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
const qsToken = qs.parse(window.location.search.replace('?', ''));
const octokit = new Octokit({ auth: qsToken.token });


function RepositoryComponent({repository}: RepositoryProps) {
    const classes = useStyles();
    const {name, updatedAt, defaultBranchRef} = repository;
    const target = defaultBranchRef?.target as Commit;
    const [workflows, setWorkflows] = useState<any>([])

    useEffect(() => {
        getWorkflows();
    });

    async function getWorkflows() {
        try {
            const newWorkflows = await octokit.request(`GET /repos/newdaycards/${name}/actions/workflows`) as any;
            setWorkflows(newWorkflows);
        }catch{}
    }

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
                    {workflows?.data?.workflows.map((workflow: any, i: number) =>
                        <Workflow workflow={workflow} key={i}/>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default RepositoryComponent;