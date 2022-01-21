import React from "react";
import { Footer } from "../components/Footer/Footer";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import Navigation from "../components/Navigation/Navigation";

export default function Login() {
    return (
        <>
            <Navigation />
            <LoginForm />
            <Footer />
        </>
    )
}