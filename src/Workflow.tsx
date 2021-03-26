import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Accordion, AccordionDetails, Fab, List} from "@material-ui/core";
import WorkflowRun from "./WorkflowRun";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Octokit} from "@octokit/core";
import qs from 'querystring';

export type WorkflowProps = {
    workflow: any
    owner: string,
    repo: string
};

const qsToken = qs.parse(window.location.search.replace('?', ''));
const octokit = new Octokit({ auth: qsToken.token });

function WorkflowComponent({workflow, owner, repo}: WorkflowProps) {
    const {id, name, state} = workflow;
    const [workflowRuns, setWorkflowRuns] = useState<any>([])

    useEffect(() => {
        getWorkflowRuns();
    }, []);

    async function getWorkflowRuns() {
        try {
            const newWorkflowRuns = await octokit.request(`GET /repos/${owner}/${repo}/actions/workflows/${id}/runs`) as any;
            console.log(newWorkflowRuns);
            setWorkflowRuns(newWorkflowRuns);
        }catch{}
    }

    async function runWorkflow() {
        try {
            await octokit.request(`POST /repos/${owner}/${repo}/actions/workflows/${id}/dispatches`, {
                ref: 'main'
            })
        }catch{}
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                {name} ({state})
                <Fab size="small" aria-label="Run">
                    <PlayCircleOutlineIcon onClick={runWorkflow}/>
                </Fab>
            </AccordionSummary>
            <AccordionDetails>
                <List component="nav" aria-label="mailbox folders">
                    {workflowRuns?.data?.workflow_runs?.map((workflow: any, i: number) =>
                        <WorkflowRun workflowRun={workflow} owner={owner} repo={repo} key={i}/>
                        )}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export default WorkflowComponent;