import { gql, useQuery } from "@apollo/client";
import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, Link, makeStyles, MenuItem, Select, TextField, } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Footer } from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { UserContext } from "../contexts/UserContext";

const DISTRITCS = gql`
  query Districs {
    districts {
      id
      name
    }
  }
`;


const useStyles = makeStyles(theme => ({
    save: {
        marginTop: "30px"
    }
}))
export default function Settings() {
    const classes = useStyles();
    const { firstName, lastName, birthDate, district, updateUser } = useContext(UserContext);
    const { data: districts } = useQuery(DISTRITCS);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            firstName,
            lastName,
            birthDate,
            district
        }
    });

    const onSubmit = (values) => {
        updateUser({firstName: values.firstName, lastName: values.lastName, birthDate: values.birthDate, districtId: values.district})
    }
    return (
        <>
            <Navigation />
            <Container maxWidth="md">
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="Imię"
                                name="firstName"
                                autoComplete="firstName"
                                {...register("firstName", {
                                    required: true
                                })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Nazwisko"
                                name="lastName"
                                autoComplete="lastName"
                                {...register("lastName", {
                                    required: true
                                })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.save}
                    >
                        Zapisz
                    </Button>
                </Box>
            </Container>
            <Footer />
        </>
    );
}