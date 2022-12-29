import { gql, useMutation } from "@apollo/client";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";

const CREATE_TASK = gql`
    mutation CreateTask($projectId: ID, $userId: ID, $dueDate: DateTime, $estimatedTime: Int, $priority: TaskPriorityType, $name: String, $description: String, $parentTaskId: ID) {
        createTask(data: {project: {connect: {id: $projectId}}, createdBy: {connect: {id: $userId}}, dueDate: $dueDate, estimatedTime: $estimatedTime, priority: $priority, name: $name, description: $description, status: backlog, parentTask: {connect: {id: $parentTaskId}}}) {
            id
        }
    }
`


export const CreateTaskModal = () => {
    const { isCreateTaskModalOpen, setIsCreateTaskModalOpen } = useContext(ModalContext);
    const [createTask, { loading, error }] = useMutation(CREATE_TASK);
    const { userId } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dueDate: null,
            estimatedTime: null,
            priority: "low",
            name: "",
            description: "",
        }
    });

    const handleCreateTask = async (values) => {
        // const data = await createProject({
        //     variables: {
        //         title: values.title,
        //         description: values.description
        //     }
        // })
        setIsCreateTaskModalOpen(false)
    }

    return (
        <Dialog open={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Project name"
                    type="text"
                    fullWidth
                    // {...register("title", {
                    //     required: true
                    // })}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Project description"
                    type="text"
                    multiline
                    fullWidth
                    // {...register("description", {
                    //     required: true
                    // })}
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