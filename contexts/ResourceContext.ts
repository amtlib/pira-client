import { createContext } from "react";

export type ResourceContextType = {
    activeProjectId: string | null;
    setActiveProjectId: (id: string) => void;
    activeTaskId: string | null;
    setActiveTaskId: (id: string) => void;
};

export const ResourceContext = createContext<ResourceContextType>({
    activeProjectId: null,
    activeTaskId: null,
    setActiveProjectId: () => {},
    setActiveTaskId: () => {}
});
