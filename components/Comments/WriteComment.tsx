import { gql, useMutation } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";


const ADD_COMMENT = gql`
    mutation AddComment($userId: ID, $taskId: ID, $text: String) {
        createComment(data: {author: {connect: {id: $userId}}, task: {connect: {id: $taskId}}, text: $text}) {
            id
        }
    }
`


export const WriteComment = ({ userId, taskId }: { userId: string; taskId: string; }) => {
    const [value, setValue] = useState("");

    const [addComment] = useMutation(ADD_COMMENT, { refetchQueries: ["GetTask"]});

    const handleSubmit = async () => {
        console.log(value)
        await addComment({variables: {
            userId,
            taskId,
            text: value
        }});
        setValue("");
    }
    return (
        <>
            <TextField minRows={5} multiline value={value} onChange={(e) => setValue(e.target.value)} />
            <Button variant="outlined" onClick={handleSubmit}>Add!</Button>
        </>
    )
}