import { Footer } from "../components/Footer/Footer"
import { CreateProjectModal } from "../components/Modals/CreateProjectModal"
import { CreateSubtaskModal } from "../components/Modals/CreateSubtaskModal"
import { CreateTaskModal } from "../components/Modals/CreateTaskModal"
import Navbar from "../components/Navigation/Navigation";
import styled from "styled-components"
import React from "react";

const Wrapper = styled.div`
    margin: 20px;
    max-width: 960px;
    margin: 0 auto;
`

export const BasicLayout = ({ children, page }) => {
    const WrapperComponent = ["project", "login", "register", "projects"].includes(page) ? React.Fragment : Wrapper;
    return (
        <>
            <Navbar page={page} />
            <WrapperComponent>
                {children}
                <CreateProjectModal />
                <CreateTaskModal />
                <CreateSubtaskModal />
            </WrapperComponent>

            <Footer />
        </>
    )
}