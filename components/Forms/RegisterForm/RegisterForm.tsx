import React, { useEffect, useState } from "react";
import Pollish from "../../../public/images/pollish.svg";
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, Snackbar, TextField } from "@material-ui/core";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@material-ui/pickers";
import { LogoWrapper } from "../../Logo/LogoWrapper";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";


const useStyles = makeStyles(() => ({
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

const DISTRITCS = gql`
  query Districs {
    districts {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $district: ID!, $birthDate: DateTime!) {
    createUser(data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, district: { connect: {id: $district} }, birthDate: $birthDate}) {
        firstName
        lastName
    }
  }
`

const RegisterForm = () => {
    const { data: districts } = useQuery(DISTRITCS);
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
            console.log(createUser);
        } else {
            setCreated(false);
        }
    }, [createdUser, loading, error]);

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
            {created && <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={() => {
                    router.push("/login");
                }}
            >
                <Alert severity="success">
                    Pomyślnie utworzono konto. Witamy!
                </Alert>
            </Snackbar>}
            {error && <Snackbar
                open={true}
                autoHideDuration={6000}
            >
                <Alert severity="error">
                    Nastąpił błąd podczas tworzenia konta
                </Alert>
            </Snackbar>}
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
                                        fullWidth
                                        id="district"
                                        label="Dzielnica"
                                        onChange={e => field.onChange(e.target.value)}
                                        value={field.value}
                                        error={!!errors.district}
                                    >
                                        {districts?.districts?.map(district => (
                                            <MenuItem key={district.id} value={district.id}>{district.name}</MenuItem>
                                        ))}
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
                                    value: 8,
                                    message: "Minimalna długość hasła to 8"
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