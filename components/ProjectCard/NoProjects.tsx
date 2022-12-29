import CryingCat from "../../public/images/cryingcat.jpeg";
import Image from 'next/image';
import { Button, makeStyles } from "@material-ui/core";
import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

export const NoProjects = () => {
    const classes = useStyles();
    const { setIsCreateProjectModalOpen } = useContext(ModalContext);
    return (
        <div className={classes.root}>
            <Image src={CryingCat.src} width="800px" height="450px" />
            <h1>Create a new project or ask your coworker to assign you to one</h1>
            <Button variant="contained" onClick={() => setIsCreateProjectModalOpen(true)}>Create project!</Button>
        </div>
    );
}