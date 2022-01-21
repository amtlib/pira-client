import { createContext } from "react";

export type UserContextType = {
    loggedIn: boolean;
    type?: string;
    loading: boolean;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    district?: string;
    userId?: string;
    authenticate: (email?: string, password?: string) => void;
    unauthenticate: () => void;
    updateUser: (values?: {firstName?: string; lastName?: string; birthDate?: Date; districtId?: string}) => void;
};

export const UserContext = createContext<UserContextType>({
    loggedIn: false,
    loading: false,
    authenticate: () => {},
    unauthenticate: () => {},
    updateUser: () => {}
});
