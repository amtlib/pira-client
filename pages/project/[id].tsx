import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Board from 'react-trello'
import { TaskCard } from "../../components/TaskCard/TaskCard";

import { UserContext } from "../../contexts/UserContext";
import { BasicLayout } from "../../layouts/BasicLayout";

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
`


export default function ProjectPage() {
    const router = useRouter();

    const { id } = router.query;
    const { userId } = useContext(UserContext);
    const { data, loading } = useQuery(PROJECT, { variables: { id } });

    const [tasks, setTasks] = useState([
        {
            id: 'backlog',
            title: 'Backlog',
            cards: [
                // { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
                { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' }, hideCardDeleteIcon: true }
            ]
        },
        {
            id: 'in-development',
            title: 'In development',
            cards: []
        },
        {
            id: 'in-testing',
            title: 'In testing',
            cards: []
        },
        {
            id: 'in-approval',
            title: 'In approval',
            cards: []
        },
        {
            id: 'done',
            title: 'Done',
            cards: []
        }
    ])

    // const { project } = data;

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
                                createdBy: `${task.createdBy.firstName.substring(0, 1).toUpperCase()}. ${task.createdBy.lastName.toUpperCase()}`,
                                assignedTo: `${task.assignedUser.firstName.substring(0, 1).toUpperCase()}. ${task.assignedUser.lastName.toUpperCase()}`,
                            }
                        ))
                })))
        }
    }, [data])

    useEffect(() => {
        console.log(data)
        if (!data?.project && !loading) {
            router.push("/");
        }
    }, [id, loading, data])

    return (
        <BasicLayout>
            <Board data={{ lanes: tasks }} hideCardDeleteIcon={true} components={{ Card: TaskCard }} />
        </BasicLayout>
    )

}