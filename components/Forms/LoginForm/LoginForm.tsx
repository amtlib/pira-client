import React, { useContext, useState } from "react";
import { Box, Button, Grid, LinearProgress, makeStyles, Snackbar, TextField } from "@material-ui/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Alert } from "@material-ui/lab";
import { UserContext } from "../../../contexts/UserContext";
import { Logo } from "../../Logo/LogoWrapper";

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        flex: 1,
        marginBottom: 64,
        justifyContent: "center",
        width: 500,
        maxWidth: "calc(100vw - 40px)",
        margin: "8px auto"
    },
    submit: {
        marginTop: 20,
    },
    register: {
        marginTop: 10
    },
    backdrop: {
        zIndex: 2,
        color: '#ffffff',
    },
}));

const LoginForm = () => {
    const classes = useStyles();
    const { authenticate, loading, firstName, lastName, userId } = useContext(UserContext);
    const router = useRouter();
    const [submited, setSubmited] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    
    const onSubmit = (values) => {
        setSubmited(true);
        if (values.email && values.password) {
            authenticate(values.email, values.password);
        }
    };
    return (
        <>
            { loading && <LinearProgress /> }
            {!loading && userId && <Snackbar
                open={true}
                autoHideDuration={3000}
                onClose={() => {
                    router.push("/");
                }}
            >
                <Alert severity="success">
                    Logged in! Hello, {firstName} {lastName}
                </Alert>
            </Snackbar>}
            {!loading && !userId && submited && <Snackbar
                open={true}
            >
                <Alert severity="error">
                    Invalid email or password
                </Alert>
            </Snackbar>}
            <Box
                className={classes.form}
            >
                <Logo />
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
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
                                        message: "You need to provide a valid email address"
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                {...register("password", { required: true })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
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
                        Log in
                    </Button>
                    <Grid className={classes.register}>
                        You don't have an accout? <Link href="/register">Register!</Link>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
export default LoginForm;