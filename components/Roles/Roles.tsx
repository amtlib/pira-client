import { gql, useQuery } from "@apollo/client";
import { FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ResourceContext } from "../../contexts/ResourceContext";

const ASSIGNED_USERS = gql`
    query AssignedUsers($projectId: ID) {
        assigneeUsers(where: {project: {id: {equals: $projectId}}}) {
            id
            user {
                id
                firstName
                lastName
            }
            role
        }
    }
`;

const useStyles = makeStyles({
    wrapper: {
        width: "300px"
    },
    table: {
        // minWidth: 650,
        // margin: "0 auto"
    },
});

export const Roles = () => {
    const { activeProjectId } = useContext(ResourceContext);
    const classes = useStyles();
    const { register, setValue, handleSubmit, control } = useForm();
    const { data } = useQuery(ASSIGNED_USERS, {
        variables: {
            projectId: activeProjectId
        }
    });

    useEffect(() => {
        if (data.assigneeUsers) {
            data.assigneeUsers.map(({id, role}) => {
                setValue(`role-${id}`, role);
            })
        }
    }, [data])

    return (
        <TableContainer component={Paper} className={classes.wrapper}>
            <Table className={classes.table} >
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.assigneeUsers.map(({ user, role, id }) => (
                        <TableRow key={id}>
                            <TableCell component="th" scope="row">
                                {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell>
                                <Controller
                                    name={`role-${id}`}
                                    control={control}
                                    defaultValue="user"
                                    render={({ field: { ref, ...rest } }) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                {...rest}
                                            >
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="manager">Manager</MenuItem>
                                                <MenuItem value="user">User</MenuItem>
                                                <MenuItem value="client">Client</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}