import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { UserContext } from '../../contexts/UserContext';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Logo } from '../Logo/LogoWrapper';
import { ModalContext } from '../../contexts/ModalContext';
import { ResourceContext } from '../../contexts/ResourceContext';
import { BackButton } from '../BackButton/BackButton';

const useStyles = makeStyles(() => ({
    title: {
        // flexGrow: 1,
        cursor: "pointer",
        height: "30px",
    },
    avatar: {
        backgroundColor: "#ff0000",
    },
    buttons: {
        marginLeft: "auto",
        '& > *': {
            margin: "10px",
        },
    },
    toolbar: {
        width: "100%",
        gap: "40px"
    }
}));

const Navbar = ({ page }: { page?: "index" | "project" | "task" | "projectSettings" | "login" | "register" | "projects" }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { loggedIn, firstName, unauthenticate, email } = useContext(UserContext);
    const { setIsCreateProjectModalOpen, setIsCreateTaskModalOpen, setIsCreateSubtaskModalOpen } = useContext(ModalContext);
    const { activeProjectId } = useContext(ResourceContext);
    const { userId } = useContext(UserContext);

    const showMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogOut = () => {
        unauthenticate();
        setAnchorEl(null);
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Link href="/">
                    <div className={classes.title}>
                        <Logo />
                    </div>
                </Link>
                {(page === "task" || page === "projectSettings") && (
                    <BackButton />
                )}
                <div className={classes.buttons}>
                    {page === "projects" && userId && (
                        <Button variant="contained" onClick={() => setIsCreateProjectModalOpen(true)}>create project</Button>
                    )}
                    {page === "project" && (
                        <>
                            <Button variant="contained" color="secondary" onClick={() => setIsCreateTaskModalOpen(true)}>create task</Button>
                            <Link href={`/project/${activeProjectId}/settings`}>
                                <Button variant="outlined" color="default">project settings</Button>
                            </Link>
                        </>
                    )}
                    {page === "task" && (
                        <Button variant="contained" color="secondary" onClick={() => setIsCreateSubtaskModalOpen(true)}>create subtask</Button>
                    )}
                    {loggedIn ? (
                        <>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={showMenu}
                                color="inherit"
                            >
                                <Avatar aria-label="poll" className={classes.avatar}>
                                    {firstName?.substring(0, 1).toUpperCase() || email?.substring(0, 1).toUpperCase()}
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
                                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button color="inherit" >
                                Log in
                            </Button>
                        </Link>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;