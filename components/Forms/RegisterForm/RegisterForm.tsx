import React, { useEffect, useState } from "react";
import { Box, Button, Grid, LinearProgress, makeStyles, Snackbar, TextField } from "@material-ui/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { Logo } from "../../Logo/LogoWrapper";


const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        maxWidth: 500,
        margin: "8px auto",
        flex: 1,
        justifyContent: "center",
        marginBottom: 64
    },
    submit: {
        marginTop: 20,
    },
    login: {
        marginTop: 10
    }
}));


const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
        firstName
        lastName
    }
  }
`

const RegisterForm = () => {
    const [createUser, { data: createdUser, loading, error }] = useMutation(CREATE_USER, { errorPolicy: 'all' });

    const [created, setCreated] = useState(false);
    const classes = useStyles();
    const router = useRouter();

    const onSubmit = (values) => {
        createUser({ variables: values }).catch(e => console.log(e));
    };

    useEffect(() => {
        if (!loading && createdUser) {
            setCreated(true);
        } else {
            setCreated(false);
        }
    }, [createdUser, loading, error]);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordRepeat: ""
        }
    });
    return (
        <Box
            className={classes.form}
        >
            {loading && <LinearProgress />}
            {created && <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={() => {
                    router.push("/login");
                }}
            >
                <Alert severity="success">
                    Registred, hello!
                </Alert>
            </Snackbar>}
            {error && <Snackbar
                open={true}
                autoHideDuration={6000}
            >
                <Alert severity="error">
                    Error during creating an accout
                </Alert>
            </Snackbar>}
            <Logo />
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First name"
                            autoFocus
                            {...register("firstName", { required: true })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last name"
                            name="lastName"
                            autoComplete="family-name"
                            {...register("lastName", { required: true })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            {...register("email", {
                                required: true, pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Wprowadzona wartość musi być adresem email"
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}

                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            {...register("password", {
                                required: true, minLength: {
                                    value: 8,
                                    message: "Hasło musi mieć conajmniej 8 znaków"
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="passwordRepeat"
                            label="Repeat password"
                            type="password"
                            id="passwordRepeat"
                            autoComplete="passwordRepeat"
                            {...register("passwordRepeat", {
                                required: true, validate: (val: string) => {
                                    if (watch('password') != val) {
                                        return "Hasła muszą być takie same";
                                    }
                                },
                                minLength: {
                                    value: 8,
                                    message: "Hasło musi mieć conajmniej 8 znaków"
                                }
                            })}
                            error={!!errors.passwordRepeat}
                            helperText={errors.passwordRepeat?.message}
                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Zarejestruj się
                </Button>
                <Grid className={classes.login}>
                    Masz juz konto? <Link href="/login">Zaloguj się!</Link>
                </Grid>
            </Box>
        </Box >
    )
}
export default RegisterForm;