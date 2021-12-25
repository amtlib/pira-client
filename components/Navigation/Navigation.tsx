import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <Typography variant="h6" className={classes.title}>
                        Pollish
                    </Typography>
                </Link>
                <Link href="/login">
                    <Button color="inherit" >
                        Zaloguj się
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;