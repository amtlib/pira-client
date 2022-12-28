import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const AUTHENTICATE = gql`
    mutation Authenticate($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                sessionToken
                item {
                    firstName
                    lastName
                    email
                    id
                }
            }
        }
    }
`;

const CHECK_TOKEN = gql`
    query CheckToken {
        authenticatedItem {
            ... on User {
                firstName
                lastName
                email
                id
            }
        }
    }
`;

const UNAUTHENTICATE = gql`
    mutation EndSession {
        endSession
    }
`;

export function UserContainer({ children }) {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const [authenticateUserWithPassword, { data: authenticateData, loading: authenticateLoading }] = useMutation(AUTHENTICATE);
    const { data: checkTokenData, loading: checkTokenLoading } = useQuery(CHECK_TOKEN);
    const [endSession] = useMutation(UNAUTHENTICATE);


    const authenticate = (email?: string, password?: string) => {
        authenticateUserWithPassword({ variables: { email, password } });
    };

    const unauthenticate = () => {
        endSession();
        setFirstName(null);
        setLastName(null);
        setUserId(null);
        setEmail(null);
        setLoggedIn(false);
    };

    useEffect(() => {
        if (authenticateData && !authenticateLoading) {
            const { item } = authenticateData?.authenticateUserWithPassword;
            if (item) {
                setFirstName(item.firstName);
                setLastName(item.lastName);
                setEmail(item.email);
                setLoggedIn(true);
                setUserId(item.id);
            }
        }
    }, [authenticateData, authenticateLoading]);

    useEffect(() => {
        if (checkTokenData?.authenticatedItem && !checkTokenLoading) {
            console.log(checkTokenData)
            const { firstName, lastName, id, email } = checkTokenData?.authenticatedItem;
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setLoggedIn(true);
            setUserId(id);
        }
    }, [checkTokenData, checkTokenLoading])


    return <UserContext.Provider value={{
        firstName,
        lastName,
        userId,
        loading: authenticateLoading || checkTokenLoading,
        loggedIn,
        email,
        authenticate,
        unauthenticate
    }}>{children}</UserContext.Provider>
}