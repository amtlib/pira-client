import { Footer } from "../components/Footer/Footer"
import { CreateProjectModal } from "../components/Modals/CreateProjectModal"
import Navbar from "../components/Navigation/Navigation"

export const BasicLayout = ({ children }) => {
    

    return (
        <>
            <Navbar />
            {children}
            <CreateProjectModal />
            <Footer />
        </>
    )
}