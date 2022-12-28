import { gql, useQuery } from "@apollo/client";
import { Typography, Grid, Button, Card, CardMedia, CardContent, CardActions, Container, makeStyles, LinearProgress, Avatar, CardHeader } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useContext } from "react";
import { Footer } from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import { UserContext } from "../contexts/UserContext";
import Pira from "../public/images/pira.svg";
import Board from "react-trello"


export default function Home() {
  const { userId } = useContext(UserContext);
  // const { data, loading, error } = useQuery(POLLS, { variables: { userId }});
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        label: '2/2',
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane2',
        title: 'Completed',
        label: '0/0',
        cards: []
      },
    ]
  }
  return (
    <>
      <Navigation />
      {/* {loading && <LinearProgress />} */}
      <div style={{ width: "100%", }}>
        <Board data={data} />
      </div>
      <Footer />
    </>
  );
}