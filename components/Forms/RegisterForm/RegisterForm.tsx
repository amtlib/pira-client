import React, { useEffect } from "react";
import Pollish from "../../../public/images/pollish.svg";
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@material-ui/pickers";

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

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: null,
            district: ""
        }
    });
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
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
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
                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            name='birthDate'
                            render={({ field }) => (
                                <DatePicker
                                    label='Data urodzenia'
                                    onChange={(date) => field.onChange(date)}
                                    value={field.value}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Dzielnica</InputLabel>
                            <Controller
                                control={control}
                                name='district'
                                render={({ field }) => (
                                    <Select
                                        labelId="district"
                                        id="district"
                                        label="Dzielnica"
                                        onChange={e => field.onChange(e.target.value)}
                                        value={field.value}
                                        error={!!errors.district}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                )} />
                            {errors.district?.message && <FormHelperText>{errors.district?.message}</FormHelperText>}
                        </FormControl>
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
                            {...register("password", {
                                required: true, minLength: {
                                    value: 5,
                                    message: "Minimalna długość hasła to 5"
                                }
                            })}
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