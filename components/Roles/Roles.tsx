import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useContext, useEffect, useRef, useState } from "react";
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

const UNASSIGN_USER = gql`
    mutation UnassignUser($id: ID) {
        deleteAssigneeUser(where: {id: $id}) {
            id
        }
    }
`;

const CHANGE_ROLE = gql`
    mutation ChangeRole($id: ID, $role: AssigneeUserRoleType) {
        updateAssigneeUser(where: {id: $id}, data: {role: $role}) {
            id
        }
    }
`;

const ASSIGN_USER = gql`
    mutation AssignUser($projectId: ID, $userId: ID) {
        createAssigneeUser(data: {project: {connect: {id: $projectId}}, user: {connect: {id: $userId}}, role:user}) {
            id
        }
    }
`;

const USERS = gql`
    query GetUsers {
        users {
            id
            firstName
            lastName
        }
    }
`

const useStyles = makeStyles({
    tableWrapper: {
        width: "500px"
    },
    table: {
        // minWidth: 650,
        // margin: "0 auto"
    },
    wrapper: {

    }

});

export const Roles = () => {
    const { activeProjectId } = useContext(ResourceContext);
    const classes = useStyles();
    const { register, setValue, handleSubmit, control } = useForm();
    const { data, loading: loadingAssignedUsers } = useQuery(ASSIGNED_USERS, {
        variables: {
            projectId: activeProjectId
        }
    });

    const [unassignUser] = useMutation(UNASSIGN_USER, { refetchQueries: ["AssignedUsers"] });
    const [changeRole] = useMutation(CHANGE_ROLE, { refetchQueries: ["AssignedUsers"] });
    const [assignUser] = useMutation(ASSIGN_USER, { refetchQueries: ["AssignedUsers"] });
    const { data: users } = useQuery(USERS);

    const [assignValue, setAssignValue] = useState<string | {
        id: string;
        firstName: string;
        lastName: string;
    }>();
    const [assignInputValue, setAssignInputValue] = useState("");


    useEffect(() => {
        if (data?.assigneeUsers) {
            data.assigneeUsers.map(({ id, role }) => {
                setValue(`role-${id}`, role);
            })
        }
    }, [data]);

    const handleRemove = (id) => {
        if (confirm("Do you really want to remove this user from project?")) {
            unassignUser({
                variables: {
                    id
                }
            })
        }
    }

    const onSubmit = (values) => {
        Object.keys(values).map(key => {
            changeRole({
                variables: {
                    id: key.split("-")[1],
                    role: values[key]
                }
            })
        })
    }

    const handleAssign = () => {
        if (typeof assignValue === "object") {
            assignUser({variables: {
                projectId: activeProjectId,
                userId: assignValue.id
            }})
            setAssignValue(undefined);
            setAssignInputValue("");
        }
    }

    return (
        <div className={classes.wrapper}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TableContainer component={Paper} className={classes.tableWrapper}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Action</TableCell>
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
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleRemove(id)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" color="primary" type="submit">Save</Button>
                </TableContainer>
                <h2>Assign user</h2>
                <Autocomplete
                    value={assignValue}
                    onChange={(event, newValue) => {
                        setAssignValue(newValue);
                    }}
                    inputValue={assignInputValue}
                    onInputChange={(event, newInputValue) => {
                        setAssignInputValue(newInputValue);
                    }}
                    options={users?.users.filter(user => !data?.assigneeUsers.find(assignedUser => assignedUser.user.id === user.id))}
                    getOptionLabel={(option: { firstName: string; lastName: string; id: string; }) => `${option.firstName} ${option.lastName}`}
                    style={{ width: 300, marginTop: 20 }}
                    renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
                />
                <Button variant="contained" onClick={handleAssign}>Assign</Button>
            </Box>
        </div>
    )
}