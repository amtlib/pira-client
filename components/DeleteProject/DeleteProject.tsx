import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, makeStyles, Paper } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ResourceContext } from "../../contexts/ResourceContext";

const useStyles = makeStyles({
    button: {
        backgroundColor: "red",
        color: "white"
    },
    wrapper: {
        padding: 15,
        margin: "20px 0"
    }
})


const DELETE_PROJECT = gql`
    mutation DeleteProject($projectId: ID) {
        deleteProject(where: {id: $projectId}) {
            id
        }
    }
`;

const ASSIGNED_USERS = gql`
    query AssignedUsers($projectId: ID) {
        assigneeUsers(where: {project: {id: {equals: $projectId}}}) {
            id
        }
    }
`;

const PROJECT_TASKS = gql`
    query ProjectTasks($projectId: ID) {
        tasks(where: {project: {id: {equals: $projectId}}}) {
            id
        }
    }
`;

const DELETE_ASSIGNEE = gql`
    mutation DeleteAssigneeUser($id: ID) {
        deleteAssigneeUser(where: {id: $id}) {
            id
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID) {
        deleteTask(where: {id: $id}) {
            id
        }
    }
`;


export const DeleteProject = () => {
    const { activeProjectId } = useContext(ResourceContext);
    const { data: assigneeUsers } = useQuery(ASSIGNED_USERS, { variables: { projectId: activeProjectId } });
    const { data: tasks } = useQuery(PROJECT_TASKS, { variables: { projectId: activeProjectId } });
    const [deleteProject] = useMutation(DELETE_PROJECT);
    const [deleteAssignee] = useMutation(DELETE_ASSIGNEE);
    const [deleteTask] = useMutation(DELETE_TASK);
    const classes = useStyles();

    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Do you really want to delete this project?")) {
            // delete tasks
            await tasks?.tasks.map(task => deleteTask({
                variables: {
                    id: task.id
                }
            }));

            // delete assignees
            await assigneeUsers?.assigneeUsers.map(assignee => deleteAssignee({ variables: { id: assignee.id } }));

            await deleteProject({
                variables: {
                    projectId: activeProjectId
                }
            });
            // redirect to the front page
            router.push("/");
        }
    }

    return (
        <Paper elevation={2} className={classes.wrapper}>
            <h2>Delete project</h2>
            <Button variant="contained" className={classes.button} onClick={handleDelete}>Delete project</Button>
        </Paper>
    )
}