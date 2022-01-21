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
                    type
                    id
                    birthDate
                    district {
                        id
                    }
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
                type
                id
                birthDate
                district {
                    id
                }
            }
        }
    }
`;

const UNAUTHENTICATE = gql`
    mutation EndSession {
        endSession
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser($userId: ID!, $firstName: String, $lastName: String, $birthDate: DateTime, $districtId: ID) {
        updateUser(where: {id: $userId}, data: {firstName: $firstName, lastName: $lastName, birthDate: $birthDate, district: {connect: {id: $districtId}}}) {
            id
        }
    }
`

export function UserContainer({ children }) {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [district, setDistrict] = useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const [authenticateUserWithPassword, { data: authenticateData, loading: authenticateLoading }] = useMutation(AUTHENTICATE);
    const [updateUserApi] = useMutation(UPDATE_USER);
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
        setType(null);
        setBirthDate(null);
        setLoggedIn(false);
        setDistrict(null);
    };

    const updateUser = ({ firstName, lastName, birthDate, districtId }) => {
        if (userId) {
            updateUserApi({variables: {userId, firstName, lastName, birthDate, districtId}});
            setFirstName(firstName);
            setLastName(lastName);
            setBirthDate(birthDate)
            setDistrict(districtId);
        }
    }

    useEffect(() => {
        if (authenticateData && !authenticateLoading) {
            const { item } = authenticateData?.authenticateUserWithPassword;
            if (item) {
                setFirstName(item.firstName);
                setLastName(item.lastName);
                setType(item.type);
                setLoggedIn(true);
                setUserId(item.id);
                setBirthDate(item.birthDate)
                setDistrict(item.district.id)
            }
        }
    }, [authenticateData, authenticateLoading]);

    useEffect(() => {
        if (checkTokenData?.authenticatedItem && !checkTokenLoading) {
            console.log(checkTokenData)
            const { firstName, lastName, type, id, birthDate, district } = checkTokenData?.authenticatedItem;
            setFirstName(firstName);
            setLastName(lastName);
            setType(type);
            setLoggedIn(true);
            setBirthDate(birthDate);
            setDistrict(district.id)
            setUserId(id);
        }
    }, [checkTokenData, checkTokenLoading])


    return <UserContext.Provider value={{
        firstName,
        lastName,
        userId,
        type,
        birthDate,
        district,
        loading: authenticateLoading || checkTokenLoading,
        loggedIn,
        updateUser,
        authenticate,
        unauthenticate
    }}>{children}</UserContext.Provider>
}