import React, { useContext, useState } from "react";
import Pollish from "../../../public/images/pollish.svg";
import { Box, Button, Grid, LinearProgress, makeStyles, Snackbar, TextField } from "@material-ui/core";
import Link from "next/link";
import { LogoWrapper } from "../../Logo/LogoWrapper";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Alert } from "@material-ui/lab";
import { UserContext } from "../../../contexts/UserContext";

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
    const { authenticate, loading, firstName, lastName } = useContext(UserContext);
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
            {!loading && firstName && <Snackbar
                open={true}
                autoHideDuration={3000}
                onClose={() => {
                    router.push("/");
                }}
            >
                <Alert severity="success">
                    Zalogowano! Witaj, {firstName} {lastName}
                </Alert>
            </Snackbar>}
            {!loading && !firstName && submited && <Snackbar
                open={true}
            >
                <Alert severity="error">
                    Błędny email lub hasło
                </Alert>
            </Snackbar>}
            <Box
                className={classes.form}
            >
                <LogoWrapper>
                    <Pollish />
                </LogoWrapper>
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
                                        message: "Wprowadzona wartość musi być adresem email"
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
                                label="Hasło"
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
                        Zaloguj
                    </Button>
                    <Grid className={classes.register}>
                        Nie masz konta? <Link href="/register">Zarejestruj się!</Link>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
export default LoginForm;