import { createContext } from "react";

export type UserType = {
    firstName: string;
    lastName: string;
    id: string;
}

export type ResourceContextType = {
    activeProjectId: string | null;
    setActiveProjectId: (id: string) => void;
    activeTaskId: string | null;
    setActiveTaskId: (id: string) => void;
    activeProjectAssigneeUsers: UserType[];
    setActiveProjectAssigneeUsers: (users: UserType[]) => void;
};

export const ResourceContext = createContext<ResourceContextType>({
    activeProjectId: null,
    activeTaskId: null,
    setActiveProjectId: () => {},
    setActiveTaskId: () => {},
    activeProjectAssigneeUsers: [],
    setActiveProjectAssigneeUsers: () => {}
});
