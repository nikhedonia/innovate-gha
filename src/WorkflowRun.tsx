import React from "react";
import {Divider, Fab, ListItem, ListItemText} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import qs from "querystring";
import {Octokit} from "@octokit/core";

export type WorkflowRunProps = {
    workflowRun: any,
    owner: string,
    repo: string
};

const qsToken = qs.parse(window.location.search.replace('?', ''));
const octokit = new Octokit({ auth: qsToken.token });

function WorkflowRunComponent({workflowRun, owner, repo}: WorkflowRunProps) {
    const {id, run_number, head_branch, head_commit, event, conclusion, status, updated_at, cancel_url} = workflowRun;
    const {message, author} = head_commit;

    async function reRun() {
        try {
            await octokit.request(`POST /repos/${owner}/${repo}/actions/runs/${id}/rerun`)
        }catch{}
    }

    async function cancel() {
        try {
            await octokit.request(`POST /repos/${owner}/${repo}/actions/runs/${id}/cancel`)
        }catch{}
    }

    return (
        <React.Fragment>
        <ListItem button>
            <ListItemText primary={
                <Typography>#{run_number} {event} to {head_branch} {message}</Typography>
            } secondary={
                <Typography>{updated_at} {conclusion}</Typography>
            }/>
            {status == 'in_progress' ?  <Fab size="small" aria-label="Cancel Run">
                <CancelOutlinedIcon onClick={cancel}/>
            </Fab> : <Fab size="small" aria-label="Rerun">
                <ReplayOutlinedIcon onClick={reRun}/>
            </Fab>}
        </ListItem>
        <Divider />
        </React.Fragment>
    );
};

export default WorkflowRunComponent;