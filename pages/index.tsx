import { gql, useQuery } from "@apollo/client";
import { Typography, Grid, Button, Card, CardMedia, CardContent, CardActions, Container, makeStyles, LinearProgress, Avatar, CardHeader } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useContext } from "react";
import { Footer } from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { UserContext } from "../contexts/UserContext";
import Pollish from "../public/images/pollish.svg";

const POLLS = gql`
  query Polls($userId: ID) {
    polls(where: {level: {not: {equals: "draft"}}}) {
      id
      createdBy {
        firstName
        lastName
      }
      question
      createdAt
      image {
        url
      }
      answersCount
      tags {
        name
      }
      hasUserAnswered(userId: $userId)
    }
  }
`;

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  logo: {
    maxWidth: 200
  },
  avatar: {
    backgroundColor: "#ff0000",
  },
}))
export default function Home() {
  const classes = useStyles();
  const { userId } = useContext(UserContext);
  const { data, loading, error } = useQuery(POLLS, { variables: { userId }});
  return (
    <>
      <Navigation />
      {loading && <LinearProgress />}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            <Pollish className={classes.logo} />
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Wszystkie ankiety w jednym miejscu!
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {data?.polls?.map((poll) => (
            <Grid item key={poll.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="poll" className={classes.avatar}>
                      {poll.createdBy.firstName.substring(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  title={`${poll.createdBy.firstName} ${poll.createdBy.lastName}`}
                  subheader={dayjs(poll.createdAt).format('DD/MM/YYYY')}
                />
                <CardMedia
                  className={classes.cardMedia}
                  image={`http://localhost:3000${poll.image.url}`}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {poll.question}
                  </Typography>
                  <Typography align="left" color="textSecondary" >
                    {poll.answersCount} mozliwych odpowiedzi
                  </Typography>
                  {poll.hasUserAnswered && <Alert severity="success">Odpowiedzono</Alert>}
                </CardContent>
                <CardActions>
                  <Link href={`/poll/${poll.id}`}>
                    <Button size="small" color="primary">
                      Zobacz
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}