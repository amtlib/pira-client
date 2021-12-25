import React from "react";
import Pollish from "../../../public/images/pollish.svg";
import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";
import { useForm } from "react-hook-form";

const LogoWrapper = styled.div`
    width: 200px;
    max-width: 200px;
`;

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20
    },
    submit: {
        marginTop: 20,
    },
    login: {
        marginTop: 10
    }
}));

const RegisterForm = () => {
    const classes = useStyles();

    const onSubmit = (values) => {
        console.log(values);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <Box
            className={classes.form}
        >
            <LogoWrapper>
                <Pollish />
            </LogoWrapper>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Imię"
                            autoFocus
                            {...register("firstName", { required: true })}
                            error={errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Nazwisko"
                            name="lastName"
                            autoComplete="family-name"
                            {...register("lastName", { required: true })}
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
                            {...register("email", { required: true })}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            {...register("password")}
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
        </Box>
    )
}
export default RegisterForm;