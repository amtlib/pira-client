import { gql, useMutation } from "@apollo/client";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ModalContext } from "../../contexts/ModalContext";
import { ResourceContext } from "../../contexts/ResourceContext";
import { UserContext } from "../../contexts/UserContext";

const CREATE_TASK = gql`
    mutation CreateTask($projectId: ID, $userId: ID, $dueDate: DateTime, $estimatedTime: Int, $priority: TaskPriorityType, $name: String, $description: String, $assigneeId: ID, $tags: String) {
        createTask(data: {project: {connect: {id: $projectId}}, createdBy: {connect: {id: $userId}}, dueDate: $dueDate, estimatedTime: $estimatedTime, priority: $priority, name: $name, description: $description, status: backlog, assignedUser: {connect: {id: $assigneeId}}, tags: $tags}) {
            id
        }
    }
`

export const CreateTaskModal = () => {
    const { isCreateTaskModalOpen, setIsCreateTaskModalOpen } = useContext(ModalContext);
    const { activeProjectId, activeProjectAssigneeUsers } = useContext(ResourceContext);
    const [createTask, { loading, error }] = useMutation(CREATE_TASK, { refetchQueries: ["PROJECT"] });
    const { userId } = useContext(UserContext);

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            dueDate: null,
            estimatedTime: 0,
            priority: "low",
            assigneeId: null,
            name: "",
            description: "",
            tags: ""
        }
    });

    useEffect(() => {
        reset()
    }, [isCreateTaskModalOpen])

    const handleCreateTask = async (values) => {
        createTask({
            variables: {
                projectId: activeProjectId,
                userId,
                dueDate: values.dueDate,
                estimatedTime: +values.estimatedTime,
                priority: values.priority,
                name: values.name,
                description: values.description,
                assigneeId: values.assigneeId,
                tags: values.tags
            }
        })
        setIsCreateTaskModalOpen(false)
    }

    return (
        <Dialog open={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Summary"
                    type="text"
                    fullWidth
                    {...register("name", {
                        required: true
                    })}
                />
                <TextField
                    margin="dense"
                    id="tag"
                    label="Tags"
                    type="text"
                    fullWidth
                    {...register("tags")}
                />
                <TextField
                    margin="dense"
                    id="estimatedTime"
                    label="Estimated time"
                    type="number"
                    fullWidth
                    {...register("estimatedTime")}
                />
                <Controller
                    name="dueDate"
                    control={control}
                    defaultValue={new Date()}
                    rules={{ required: true }}
                    render={({ field: { ref, ...rest } }) => (
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="dd/MM/yyyy"
                            disablePast={true}
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
                <Controller
                    name="assigneeId"
                    defaultValue="none"
                    control={control}
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
                <TextField
                    margin="dense"
                    id="description"
                    label="Project description"
                    type="text"
                    multiline
                    fullWidth
                    {...register("description")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsCreateTaskModalOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(handleCreateTask)} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}