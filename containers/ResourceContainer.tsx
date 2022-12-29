import { useState } from "react";
import { ResourceContext } from "../contexts/ResourceContext";


export function ResourceContainer({ children }) {
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    


    return <ResourceContext.Provider value={{
        activeProjectId,
        setActiveProjectId,
        activeTaskId,
        setActiveTaskId
    }}>{children}</ResourceContext.Provider>
}