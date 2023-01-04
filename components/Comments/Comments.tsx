import React from "react";
import styled from "styled-components";
import { WriteComment } from "./WriteComment";


const Comment = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    border: 2px solid black;
    padding: 20px 10px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
`;

const Author = styled.div``;

const Text = styled.div`
    flex-grow: 1;
`;

type CommentType = {
    id: string;
    text: string;
    author: {
        firstName: string;
        lastName: string;
    }
}

export const Comments = ({ comments, userId, taskId }: { comments: CommentType[], userId: string; taskId: string }) => {
    return (
        <Wrapper>
            <h1>Comments</h1>
            {comments.map(comment => (
                <Comment key={comment.id}>
                    <Author>{comment.author.firstName} {comment.author.lastName}:</Author>
                    <Text>{comment.text}</Text>
                </Comment>
            ))}
        <h2>Write comment</h2>
        <WriteComment userId={userId} taskId={taskId} />
        </Wrapper>
    )
}