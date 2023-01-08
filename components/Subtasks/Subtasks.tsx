import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { ResourceContext } from "../../contexts/ResourceContext";

const SubtasksWrapper = styled.div``;
const Subtask = styled.div`
    
`;

export const Subtasks = ({ subtasks }: { subtasks: {id: string, name: string }[]}) => {
    const { activeProjectId } = useContext(ResourceContext);
    if (!subtasks?.length) {
        return null;
    }
    return (
        <SubtasksWrapper>
            {subtasks.map(subtask => (
                <Subtask>
                    {subtask.name}
                    <Link href={`/project/${activeProjectId}/task/${subtask.id}`}>Visit</Link>
                </Subtask>
            ))}
        </SubtasksWrapper>
    )
}