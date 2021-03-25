import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Accordion, AccordionDetails, Fab, List} from "@material-ui/core";
import WorkflowRun from "./WorkflowRun";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Octokit} from "@octokit/core";

export type WorkflowProps = {
    workflow: any
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

const workflowRuns = [
    {
        "name": "Build",
        "head_branch": "master",
        "head_sha": "acb5820ced9479c074f688cc328bf03f341a511d",
        "run_number": 562,
        "event": "push",
        "status": "queued",
        "workflow_id": 159038,
        "url": "https://api.github.com/repos/octo-org/octo-repo/actions/runs/30433642",
        "pull_requests": [],
        "created_at": "2020-01-22T19:33:08Z",
        "updated_at": "2020-01-22T19:33:08Z",
        "jobs_url": "https://api.github.com/repos/octo-org/octo-repo/actions/runs/30433642/jobs",
        "logs_url": "https://api.github.com/repos/octo-org/octo-repo/actions/runs/30433642/logs",
        "artifacts_url": "https://api.github.com/repos/octo-org/octo-repo/actions/runs/30433642/artifacts",
        "cancel_url": "https://api.github.com/repos/octo-org/octo-repo/actions/runs/30433642/cancel",
        "rerun_url": "https://api.github.com/repos/octo-org/octo-repo/actions/runs/30433642/rerun",
        "workflow_url": "https://api.github.com/repos/octo-org/octo-repo/actions/workflows/159038",
        "head_commit": {
            "id": "acb5820ced9479c074f688cc328bf03f341a511d",
            "tree_id": "d23f6eedb1e1b9610bbc754ddb5197bfe7271223",
            "message": "Create linter.yaml",
            "timestamp": "2020-01-22T19:33:05Z",
            "author": {
                "name": "Octo Cat",
                "email": "octocat@github.com"
            },
            "committer": {
                "name": "GitHub",
                "email": "noreply@github.com"
            }
        }
    }
]

const octokit = new Octokit({ auth: `a74dc9f9ec9c04e5f5f196a717eb8e3942462436` });



function WorkflowComponent({workflow}: WorkflowProps) {
    const classes = useStyles();
    const {id, name, state} = workflow;

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                {name} ({state})
                {/*<Fab size="small" aria-label="Run">
                    <PlayCircleOutlineIcon href={`https://api.github.com/repos/octocat/hello-world/actions/workflows/{id}/dispatches`}/>
                </Fab>*/}
            </AccordionSummary>
           {/* <AccordionDetails>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    {workflowRuns.map(workflow =>
                        <WorkflowRun workflowRun={workflow}/>
                        )}
                </List>
            </AccordionDetails>*/}
        </Accordion>
    );
};

export default WorkflowComponent;