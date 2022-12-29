import { createContext } from "react";

export type ModalContextType = {
    isCreateProjectModalOpen: boolean;
    setIsCreateProjectModalOpen: (isOpen: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
    isCreateProjectModalOpen: false,
    setIsCreateProjectModalOpen: () => {}
});
