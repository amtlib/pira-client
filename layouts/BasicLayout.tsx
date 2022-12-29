import { Footer } from "../components/Footer/Footer"
import { CreateProjectModal } from "../components/Modals/CreateProjectModal"
import { CreateTaskModal } from "../components/Modals/CreateTaskModal"
import Navbar from "../components/Navigation/Navigation"

export const BasicLayout = ({ children }) => {
    

    return (
        <>
            <Navbar />
            {children}
            <CreateProjectModal />
            <CreateTaskModal />
            <Footer />
        </>
    )
}