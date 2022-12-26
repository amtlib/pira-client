import { useQuery } from "@apollo/client";
import { Chip, Container, LinearProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { UserContext } from "../../contexts/UserContext";
import { Footer } from "../../components/Footer/Footer";

// const POLL = gql`
//     query Poll($id: ID!, $userId: ID) {
//         poll(where: { id: $id }) {
//             question
//             answers {
//                 id
//                 text
//             }
//             createdBy {
//                 firstName
//                 lastName
//             }
//             createdAt
//             tags {
//                 id
//                 name
//             }
//             hasUserAnswered(userId: $userId)
//             level
//         }
//     }
// `;

// const POLL_ANONYMOUS = gql`
//     query Poll($id: ID!) {
//         poll(where: { id: $id }) {
//             question
//             answers {
//                 id
//                 text
//             }
//             createdBy {
//                 firstName
//                 lastName
//             }
//             createdAt
//             tags {
//                 id
//                 name
//             }
//             level
//         }
//     }
// `;

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 600,
        margin: "8px auto",
        padding: 20,
        textAlign: "left"
    },
    image: {
        position: "absolute",
        width: "100%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    heroContent: {
        height: 200,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0,0,0,0.3)"
    },
    question: {
        color: "#fff",
        zIndex: 2
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        maxWidth: "1000px",
        margin: "0 auto",
        flexWrap: "wrap"
    },

    tag: {}
}))


export default function PollPage() {
    const router = useRouter();
    const classes = useStyles();
    const { id } = router.query;
    const { userId } = useContext(UserContext);
    // const { data, loading, error } = useQuery(userId ? POLL : POLL_ANONYMOUS, { variables: { id, userId } });

    // useEffect(() => {
    //     if (!loading && !data) {
    //         console.log("not found")
    //     }
    // }, [loading, data]);
    // if(!data) {
    //     return null;
    // }
    return <h1>project page</h1>
    // return (
    //     <>
    //         <Navigation />
    //         {loading && <LinearProgress />}
    //         <div className={classes.paper}>
    //             <Paper elevation={2} className={classes.paper}>
    //                 <Typography component="h1" variant="h5">
    //                     {data?.poll.question}
    //                 </Typography>
    //                 <Survey answers={data?.poll?.answers} type="radio" hasUserAnswered={data?.poll?.hasUserAnswered} level={data?.poll?.level} />
    //             </Paper>
    //         </div>
    //         <div className={classes.row}>
    //             <Typography component="h2" variant="h5">
    //                 Wyniki
    //             </Typography>
    //         </div>
    //         <div className={classes.row}>
    //             <Donut pollId={id as string} age={{ min: 0, max: 18 }} />
    //             <Donut pollId={id as string} age={{ min: 19, max: 35 }} />
    //             <Donut pollId={id as string} age={{ min: 36, max: 60 }} />
    //             <Donut pollId={id as string} age={{ min: 61, max: 140 }} />
    //         </div>
    //         <div className={classes.row}>
    //             <Typography component="h2" variant="h5">
    //                 Tagi
    //             </Typography>
    //         </div>
    //         <div className={classes.row}>
    //             {data?.poll?.tags?.map((tag, index) => (
    //                 <Chip label={`#${tag.name}`} key={index} variant="outlined" />
    //             ))}
    //         </div>
    //         <Footer />
    //     </>
    // )
}