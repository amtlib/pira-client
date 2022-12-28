import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Board from 'react-trello'

import { UserContext } from "../../contexts/UserContext";
import { BasicLayout } from "../../layouts/BasicLayout";

const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Backlog',
        cards: [
          {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
          {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
        ]
      },
      {
        id: 'lane2',
        title: 'In development',
        cards: []
      },
      {
        id: 'lane3',
        title: 'In testing',
        cards: []
      },
      {
        id: 'lane4',
        title: 'In approval',
        cards: []
      },
      {
        id: 'lane5',
        title: 'Done',
        cards: []
      }
    ]
  }

export default function PollPage() {
    const router = useRouter();

    const { id } = router.query;
    const { userId } = useContext(UserContext);
    
    return (
        <BasicLayout>
            <Board data={data} />
        </BasicLayout>
    )
    
}