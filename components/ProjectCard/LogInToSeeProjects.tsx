import { Button, makeStyles } from "@material-ui/core";

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

export const LogInToSeeProjects = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Log in to see projects!</h1>
            <Button href="/login" variant="contained">Log in!</Button>
        </div>
    );
}