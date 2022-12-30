import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ResourceContext, UserType } from "../contexts/ResourceContext";


const ASSIGNED_USERS = gql`
    query GetAssignedUsers($projectId: ID) {
        assigneeUsers(where: {project: {id: {equals: $projectId}}}) {
            user {
                firstName
                lastName
                id
            }
        }
    }
`


export function ResourceContainer({ children }) {
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

    const [activeProjectAssigneeUsers, setActiveProjectAssigneeUsers] = useState<UserType[]>([])
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    const { data } = useQuery(ASSIGNED_USERS, { variables: { projectId: activeProjectId } });

    useEffect(() => {
        console.log("assigned users", data?.assigneeUsers.map(({ user }) => user.firstName))
        if (data) {
            setActiveProjectAssigneeUsers(data?.assigneeUsers.map(({ user }) => user as UserType));
        }
    }, [data])

    return <ResourceContext.Provider value={{
        activeProjectId,
        setActiveProjectId,
        activeTaskId,
        setActiveTaskId,
        activeProjectAssigneeUsers,
        setActiveProjectAssigneeUsers
    }}>{children}</ResourceContext.Provider>
}