import React from "react";
import Pollish from "../../../public/images/pollish.svg";
import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";

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
    register: {
        marginTop: 10
    }
}));

const LoginForm = ({ onSubmit }) => {
    const classes = useStyles();
    return (
        <Box
            className={classes.form}
        >
            <LogoWrapper>
                <Pollish />
            </LogoWrapper>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
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
                            autoComplete="new-password"
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
    )
}
export default LoginForm;