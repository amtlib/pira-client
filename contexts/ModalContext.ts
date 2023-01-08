import { createContext } from "react";

export type ModalContextType = {
    isCreateProjectModalOpen: boolean;
    setIsCreateProjectModalOpen: (isOpen: boolean) => void;
    isCreateTaskModalOpen: boolean;
    setIsCreateTaskModalOpen: (isOpen: boolean) => void;
    isCreateSubtaskModalOpen: boolean;
    setIsCreateSubtaskModalOpen: (isOpen: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
    isCreateProjectModalOpen: false,
    setIsCreateProjectModalOpen: () => {},
    isCreateTaskModalOpen: false,
    setIsCreateTaskModalOpen: () => {},
    isCreateSubtaskModalOpen: false,
    setIsCreateSubtaskModalOpen: () => {}
});
