import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { UserContext } from "../../../contexts/UserContext";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        overflow: "auto",
        backgroundColor: theme.palette.background.paper
    }
}));

const VOTE = gql`
    mutation Vote($answerId: ID!, $userId: ID) {
        createResponse(data: {user: {connect: {id: $userId}}, answer: { connect: {id: $answerId}}}) {
            id
        }
    }
`;
const VOTE_ANONYMOUS = gql`
    mutation Vote($answerId: ID!) {
        createResponse(data: { answer: { connect: {id: $answerId}}}) {
            id
        }
    }
`;
const Survey = ({ answers, type, hasUserAnswered, isOpen }: { answers: { id: string; text: string }[]; type?: "radio" | "checkbox"; hasUserAnswered?: boolean; isOpen?: boolean }) => {
    const [checked, setChecked] = useState<null | string>(null);
    const classes = useStyles();
    const { userId } = useContext(UserContext);
    const [vote, { data, loading, error }] = useMutation(userId ? VOTE : VOTE_ANONYMOUS);

    const handleToggle = value => {
        setChecked(value);
    };

    const onSubmit = () => {
        vote({variables: {
            answerId: checked,
            userId
        }})
    }

    return (
        <div>
            {hasUserAnswered ? (
                <Alert severity="info">Juz odpowiedziales na tą ankiete</Alert>
            ) : !isOpen ? (
                <Alert severity="info">Ankieta nie jest juz dostepna</Alert>
            ) : null}
            <List>
                {answers?.map(answer => (
                    <ListItem
                        key={answer.id}
                        onClick={() => handleToggle(answer.id)}
                    >
                        <FormControlLabel
                            control={<Radio />}
                            checked={checked === answer.id}
                            tabIndex={-1}
                            label={answer.text}
                            disabled={hasUserAnswered}
                        />
                    </ListItem>
                ))}
            </List>
            <Button color="primary" onClick={onSubmit} disabled={!checked} variant="contained">Odpowiedz</Button>
        </div>
    );
}

export default Survey;
