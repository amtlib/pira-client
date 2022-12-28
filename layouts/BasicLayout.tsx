import { Footer } from "../components/Footer/Footer"
import Navbar from "../components/Navigation/Navigation"

export const BasicLayout = ({ children}) => {
 return (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
 )
}