import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { UserContext } from '../../contexts/UserContext';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
        cursor: "pointer"
    },
    avatar: {
        backgroundColor: "#ff0000",
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { loggedIn, firstName, unauthenticate } = useContext(UserContext);

    const showMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogOut = () => {
        unauthenticate();
        setAnchorEl(null);
    }
    const handleSettings = () => {

        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <Typography variant="h6" className={classes.title}>
                        Pollish
                    </Typography>
                </Link>
                {loggedIn ? (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={showMenu}
                            color="inherit"
                        >
                            <Avatar aria-label="poll" className={classes.avatar}>
                                {firstName?.substring(0, 1).toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                             <Link href={`/settings`}>
                                <MenuItem onClick={handleSettings}>Ustawienia</MenuItem>
                             </Link>
                            <MenuItem onClick={handleLogOut}>Wyloguj się</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <Link href="/login">
                        <Button color="inherit" >
                            Zaloguj się
                        </Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;