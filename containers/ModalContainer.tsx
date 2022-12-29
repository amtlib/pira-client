import { useState } from "react";
import { ModalContext } from "../contexts/ModalContext";


export function ModalContainer({ children }) {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    


    return <ModalContext.Provider value={{
        isCreateProjectModalOpen,
        setIsCreateProjectModalOpen
    }}>{children}</ModalContext.Provider>
}