import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Divider, ListItem, ListItemText} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

export type WorkflowRunProps = {
    workflowRun: any
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

function WorkflowRunComponent({workflowRun}: WorkflowRunProps) {
    const classes = useStyles();
    const {run_number, head_branch, head_commit, event, status, updated_at} = workflowRun;
    const {message, author} = head_commit;

    return (
        <React.Fragment>
        <ListItem button>
            <ListItemText primary={
                <Typography>#{run_number} {event} to {head_branch} {message}</Typography>
            } secondary={
                <Typography>{updated_at} {status}</Typography>
            }/>
        </ListItem>
        <Divider />
        </React.Fragment>
    );
};

export default WorkflowRunComponent;