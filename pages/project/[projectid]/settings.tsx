import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ResourceContext } from "../../../contexts/ResourceContext";
import styled from "styled-components";

import { UserContext } from "../../../contexts/UserContext";
import { BasicLayout } from "../../../layouts/BasicLayout";
import { Box, Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Roles } from "../../../components/Roles/Roles";
import { DeleteProject } from "../../../components/DeleteProject/DeleteProject";
import { BackButton } from "../../../components/BackButton/BackButton";

const PROJECT = gql`
    query PROJECT($id: ID) {
        project(where: {id: $id}) {
            id
            title
            description
          }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject($projectId: ID, $title: String, $description: String) {
        updateProject(where: {id: $projectId}, data: {title: $title, description: $description}) {
            id
        }
    }
`

const useStyles = makeStyles({
    wrapper: {
        padding: 15,
        margin: "20px 0"
    },
    button: {
        margin: "20px 0"
    }
})

const SettingsWrapper = styled.div`
    margin: 20px;
`

export default function SettingsPage() {
    const router = useRouter();
    const classes = useStyles();

    const { projectid } = router.query;
    const { userId, type } = useContext(UserContext);
    const { setActiveProjectId, activeProjectId } = useContext(ResourceContext);
    const { handleSubmit, setValue, register } = useForm();
    const { data, loading } = useQuery(PROJECT, { variables: { id: projectid || activeProjectId } });
    const [updateProject, { data: updatedProject, error }] = useMutation(UPDATE_PROJECT, { errorPolicy: 'all', refetchQueries: ["PROJECT"] });

    useEffect(() => {
        if (!data?.project && !loading) {
            router.push("/");
        }
        setActiveProjectId(projectid?.toString());

    }, [projectid, loading, data]);

    useEffect(() => {
        if (data?.project) {
            setValue("title", data.project.title);
            setValue("description", data.project.description);
        }
    }, [data])

    const handleUpdateSettings = (values) => {
        updateProject({
            variables: {
                projectId: activeProjectId,
                title: values.title,
                description: values.description
            }
        })
    }

    return (
        <BasicLayout page="projectSettings">
            <SettingsWrapper>
                <Paper elevation={2} className={classes.wrapper}>
                    <h2>Basic settings</h2>
                    <Box component="form" onSubmit={handleSubmit(handleUpdateSettings)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Project name"
                                    type="text"
                                    margin="dense"
                                    defaultValue=" "
                                    fullWidth
                                    {...register("title", { required: true })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Project description"
                                    type="text"
                                    margin="dense"
                                    multiline
                                    fullWidth
                                    defaultValue=" "
                                    minRows={5}
                                    {...register("description")}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Save
                        </Button>
                    </Box>
                </Paper>
                <Roles />
                <DeleteProject />
            </SettingsWrapper>
        </BasicLayout>
    )
}