import { Footer } from "../components/Footer/Footer"
import { CreateProjectModal } from "../components/Modals/CreateProjectModal"
import { CreateSubtaskModal } from "../components/Modals/CreateSubtaskModal"
import { CreateTaskModal } from "../components/Modals/CreateTaskModal"
import Navbar from "../components/Navigation/Navigation"

export const BasicLayout = ({ children, page }) => {
    return (
        <>
            <Navbar page={page} />
            {children}
            <CreateProjectModal />
            <CreateTaskModal />
            <CreateSubtaskModal />
            <Footer />
        </>
    )
}