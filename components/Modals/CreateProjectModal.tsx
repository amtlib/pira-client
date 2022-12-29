import { gql, useMutation } from "@apollo/client";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, TextareaAutosize } from "@material-ui/core";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";

const CREATE_PROJECT = gql`
    mutation CreateProject($title: String, $description: String) {
        createProject(data: {title: $title, description: $description}) {
            id
        }
    }
`

const CREATE_PROJECT_OWNER = gql`
    mutation CreateProjectOwner($userId: ID, $projectId: ID) {
        createAssigneeUser(data: {project: {connect: {id: $projectId}}, role: admin, user: {connect: {id: $userId}}}) {
            id
          }
}
`


export const CreateProjectModal = () => {
    const { isCreateProjectModalOpen, setIsCreateProjectModalOpen } = useContext(ModalContext);
    const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);
    const [createProjectOwner] = useMutation(CREATE_PROJECT_OWNER, {refetchQueries: ["USER_PROJECTS"]});
    const { userId } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const handleCreateProject = async (values) => {
        const data = await createProject({
            variables: {
                title: values.title,
                description: values.description
            }
        })
        await createProjectOwner({variables: { userId, projectId: data.data?.createProject?.id}})
        setIsCreateProjectModalOpen(false)
    }

    return (
        <Dialog open={isCreateProjectModalOpen} onClose={() => setIsCreateProjectModalOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create project</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please provide a necessary information to create a new project
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Project name"
                    type="text"
                    fullWidth
                    {...register("title", {
                        required: true
                    })}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Project description"
                    type="text"
                    multiline
                    fullWidth
                    {...register("description", {
                        required: true
                    })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsCreateProjectModalOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(handleCreateProject)} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}