import { createContext } from "react";

export type UserContextType = {
    loggedIn: boolean;
    type?: string;
    loading: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    userId?: string;
    authenticate: (email?: string, password?: string) => void;
    unauthenticate: () => void;
};

export const UserContext = createContext<UserContextType>({
    loggedIn: false,
    loading: false,
    authenticate: () => {},
    unauthenticate: () => {},
});
