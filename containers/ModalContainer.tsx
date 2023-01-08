import { useState } from "react";
import { ModalContext } from "../contexts/ModalContext";


export function ModalContainer({ children }) {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isCreateSubtaskModalOpen, setIsCreateSubtaskModalOpen] = useState(false);
    


    return <ModalContext.Provider value={{
        isCreateProjectModalOpen,
        setIsCreateProjectModalOpen,
        isCreateTaskModalOpen,
        setIsCreateTaskModalOpen,
        isCreateSubtaskModalOpen,
        setIsCreateSubtaskModalOpen
    }}>{children}</ModalContext.Provider>
}