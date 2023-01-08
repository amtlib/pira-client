import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
    background-color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin: 5px 0;
`;

const Title = styled.h3`
    font-size: 16px;
    &:hover {
        color: blue;
    }
`;

const Label = styled.span<{ priority: "low" | "medium" | "high" }>`
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    ${({ priority }) => priority === "low" ? css`
        background-color: green;
    ` : priority === "medium" ? css`
        background-color: yellow;
        color: black;
    ` : css`
        background-color: red;
    `}
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Person = styled.div``

export const TaskCard = ({
    onClick,
    title,
    assignedTo,
    createdBy,
    label,
    id,
    projectId,
    reporter,
    contributors,
}) => {
    return (
        <Wrapper onClick={onClick}>
            <Row>
                <Person>Created by {createdBy}</Person>
                <Label priority={label}>{label}</Label>
            </Row>
            <Row>
                <Link href={`/project/${projectId}/task/${id}`}>
                    <Title>{title}</Title>
                </Link>
            </Row>
            <Row>
                {assignedTo ? (
                    <Person>Assigned to {assignedTo}</Person>

                ) : (
                    <Person>unassigned</Person>
                )}
            </Row>
        </Wrapper>
    );
};