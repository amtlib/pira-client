import { useQuery, useMutation } from "@apollo/client";
import { Box, Button, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import gql from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { Comments } from "../../../../components/Comments/Comments";
import { ResourceContext } from "../../../../contexts/ResourceContext";
import { UserContext } from "../../../../contexts/UserContext";

import { BasicLayout } from "../../../../layouts/BasicLayout";

const GET_TASK = gql`
    query GetTask($id: ID) {
        task(where: {id: $id}) {
            id
            name
            description
            priority
            dueDate
            estimatedTime
            status
            tags
            parentTask {
              id
              name
            }
            assignedUser {
              id
              firstName
              lastName
            }
            createdBy {
              firstName
              lastName
            }
            comments {
                id
                text
                author {
                    firstName
                    lastName
                }
            }
          }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID, $dueDate: DateTime, $estimatedTime: Int, $priority: TaskPriorityType, $name: String, $description: String, $tags: String) {
        updateTask(where: {id: $id}, data: {dueDate: $dueDate, estimatedTime: $estimatedTime, priority: $priority, name: $name, description: $description, tags: $tags }) {
            id
        }
    }
`;

const UNATTACH_TASK = gql`
    mutation UnattachTask($id: ID) {
        updateTask(where: {id: $id}, data: {assignedUser: {disconnect: true }}) {
            id

        }
    } 
`;

const ATTACH_TASK = gql`
    mutation UnattachTask($id: ID, $assigneeId: ID) {
        updateTask(where: {id: $id}, data: {assignedUser: {connect: {id: $assigneeId} }}) {
            id
        }
    } 
`;

const TaskWrapper = styled.div`
    margin: 20px;
`

export default function TaskPage() {
    const router = useRouter();

    const { id, projectid } = router.query;

    const { data, loading } = useQuery(GET_TASK, { variables: { id } });
    const { activeProjectId, activeProjectAssigneeUsers, setActiveProjectId } = useContext(ResourceContext);
    const { userId } = useContext(UserContext);

    const [updateTask, { data: updatedTask, error }] = useMutation(UPDATE_TASK, { errorPolicy: 'all', refetchQueries: ["PROJECT", "GetTask"] });
    const [unattachTask, { data: unattachedTask }] = useMutation(UNATTACH_TASK, { errorPolicy: 'all', refetchQueries: ["PROJECT"] });
    const [attachTask, { data: attachedTask }] = useMutation(ATTACH_TASK, { errorPolicy: 'all', refetchQueries: ["PROJECT"] });
    const handleUpdateTask = async (values) => {
        if (values.assigneeId === "none") {
            await unattachTask({
                variables: {
                    id
                }
            })
        } else {
            await attachTask({
                variables: {
                    id,
                    assigneeId: values.assigneeId
                }
            })
        }
        await updateTask({
            variables: {
                id,
                ...values,
                estimatedTime: +values.estimatedTime
            }
        });
    }
    const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (!data?.task && !loading) {
            router.push("/")
        }
        setActiveProjectId(projectid?.toString());

        // return () => {
        //     setActiveProjectId(null);
        // }
    }, [data, loading, setActiveProjectId]);

    useEffect(() => {
        if (data?.task) {
            setValue("name", data.task.name);
            setValue("description", data.task.description);
            setValue("estimatedTime", data.task.estimatedTime);
            setValue("assigneeId", data.task.assignedUser?.id);
            setValue("priority", data.task.priority);
            setValue("tags", data.task.tags);
            setValue("dueDate", data.task.dueDate);
        }
    }, [data])

    if (loading) {
        return (
            <BasicLayout page="index">
                <LinearProgress />
            </BasicLayout>
        )
    }


    return (
        <BasicLayout page="task">
            <Link href={`/project/${activeProjectId}`}>Back to project</Link>
            <TaskWrapper>
                <Box component="form" onSubmit={handleSubmit(handleUpdateTask)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Task name"
                                type="text"
                                margin="dense"
                                fullWidth
                                {...register("name", {
                                    required: true
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Task description"
                                type="text"
                                margin="dense"
                                multiline
                                fullWidth
                                minRows={5}
                                {...register("description")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="tags"
                                label="Tags"
                                type="text"
                                fullWidth
                                {...register("tags")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="estimatedTime"
                                label="Estimated time"
                                type="number"
                                fullWidth
                                {...register("estimatedTime")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="dd/MM/yyyy"
                                        fullWidth
                                        initialFocusedDate={Date.now()}
                                        label="Due date"
                                        KeyboardButtonProps={{
                                            "aria-label": "change due date",
                                        }}
                                        invalidDateMessage={"Due date is required"}
                                        {...rest}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="assigneeId"
                                control={control}
                                defaultValue="none"
                                render={({ field: { ref, ...rest } }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...rest}
                                        >
                                            <MenuItem value="none">None</MenuItem>
                                            {activeProjectAssigneeUsers.map(user => (
                                                <MenuItem value={user.id}>{user.firstName} {user.lastName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="priority"
                                control={control}
                                defaultValue="low"
                                render={({ field: { ref, ...rest } }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            {...rest}
                                        >
                                            <MenuItem value="low">Low</MenuItem>
                                            <MenuItem value="medium">Medium</MenuItem>
                                            <MenuItem value="high">High</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Zapisz
                    </Button>

                </Box>
                <Comments comments={data.task.comments} userId={userId} taskId={id.toString()} />
            </TaskWrapper>

        </BasicLayout>
    )

}