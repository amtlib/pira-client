import { Card, CardContent, Typography, CardActions, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

export const ProjectCard = ({project}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {project.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {project.tasksCount} tasks
            </Typography>
            <Typography variant="body2" component="p">
              {project.description}
            </Typography>
          </CardContent>
          <CardActions>
              <Button href={`/project/${project.id}`} size="small">Visit</Button>
          </CardActions>
        </Card>
    )
}