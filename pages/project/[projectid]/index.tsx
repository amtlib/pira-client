import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Board from 'react-trello'
import { TaskCard } from "../../../components/TaskCard/TaskCard";
import { ResourceContext } from "../../../contexts/ResourceContext";

import { UserContext } from "../../../contexts/UserContext";
import { BasicLayout } from "../../../layouts/BasicLayout";

const PROJECT = gql`
    query PROJECT($id: ID) {
        project(where: {id: $id}) {
            id
            title
            tasks {
              id
              name
              priority
              assignedUser {
                firstName
                lastName
              }
              createdBy {
                firstName
                lastName
              }
              status
              dueDate
              description
              
            }
          }
    }
`;

const MOVE_TASK = gql`
    mutation MoveTask($id: ID, $status: TaskStatusType) {
        updateTask(where: {id: $id}, data: {status: $status}) {
            id
        }
    }
`

export default function ProjectPage() {
    const router = useRouter();

    const { projectid } = router.query;
    const { userId } = useContext(UserContext);
    const { setActiveProjectId, activeProjectId } = useContext(ResourceContext);
    const { data, loading } = useQuery(PROJECT, { variables: { id: projectid || activeProjectId } });
    const [moveTask, { data: movedTask, error }] = useMutation(MOVE_TASK, { errorPolicy: 'all' });

    const [tasks, setTasks] = useState([
        {
            id: 'backlog',
            title: 'Backlog',
            cards: []
        },
        {
            id: 'in_development',
            title: 'In development',
            cards: []
        },
        {
            id: 'in_testing',
            title: 'In testing',
            cards: []
        },
        {
            id: 'in_approval',
            title: 'In approval',
            cards: []
        },
        {
            id: 'done',
            title: 'Done',
            cards: []
        }
    ])

    useEffect(() => {
        if (data?.project?.tasks) {
            const { tasks: apiTasks } = data.project;
            setTasks(prev =>
                prev.map(column =>
                ({
                    ...column, cards: apiTasks.filter(apiTask => apiTask.status === column.id)
                        .map(task => (
                            {
                                id: task.id,
                                title: task.name,
                                description: task.description,
                                label: task.priority,
                                projectId: data.project.id,
                                createdBy: `${task.createdBy.firstName.substring(0, 1).toUpperCase()}. ${task.createdBy.lastName.toUpperCase()}`,
                                assignedTo: task.assignedUser ? `${task.assignedUser?.firstName.substring(0, 1).toUpperCase()}. ${task.assignedUser?.lastName.toUpperCase()}` : null,
                            }
                        ))
                })))
        }
    }, [data])

    useEffect(() => {
        if (!data?.project && !loading) {
            router.push("/");
        }
        setActiveProjectId(projectid?.toString());

        return () => {
            setActiveProjectId(null);
        }
    }, [projectid, loading, data]);

    const handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        moveTask({variables: {
            id: cardId,
            status: targetLaneId
        }})
    }

    return (
        <BasicLayout>
            <Board data={{ lanes: tasks }} hideCardDeleteIcon={true} components={{ Card: TaskCard }} handleDragEnd={handleDragEnd} />
        </BasicLayout>
    )
}