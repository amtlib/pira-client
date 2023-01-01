import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Board from 'react-trello'

import { UserContext } from "../../../../contexts/UserContext";
import { BasicLayout } from "../../../../layouts/BasicLayout";

const TASK = gql`
    query GetTask($id: ID) {
        task(where: {id:"clc9v4v5i79783524v4up1tos"}) {
            id
            name
            description
            priority
            dueDate
            estimatedTime
            status
            parentTask {
              id
              name
            }
            assignedUser {
              firstName
              lastName
            }
            createdBy {
              firstName
              lastName
            }
          }
    }
`

// const PROJECT = gql`
//     query PROJECT($id: ID) {
//         project(where: {id: $id}) {
//             id
//             title
//             tasks {
//               id
//               name
//               priority
//               assignedUser {
//                 firstName
//                 lastName
//               }
//               createdBy {
//                 firstName
//                 lastName
//               }
//               status
//               dueDate
//               description
              
//             }
//           }
//     }
// `;

// const MOVE_TASK = gql`
//     mutation MoveTask($id: ID, $status: TaskStatusType) {
//         updateTask(where: {id: $id}, data: {status: $status}) {
//             id
//         }
//     }
// `


export default function TaskPage() {
    const router = useRouter();

    const { id } = router.query;
    // const { userId } = useContext(UserContext);

    const { data, loading } = useQuery(TASK);
    console.log(data)


    // const { data, loading } = useQuery(PROJECT, { variables: { id } });
    // const [moveTask, { data: movedTask, error }] = useMutation(MOVE_TASK, { errorPolicy: 'all' });

   

    // const { project } = data;

    

    // useEffect(() => {
    //     console.log(data)
    //     if (!data?.project && !loading) {
    //         router.push("/");
    //     }
    // }, [id, loading, data]);

    

    return (
        <BasicLayout>
            Task page {id}
        </BasicLayout>
    )

}