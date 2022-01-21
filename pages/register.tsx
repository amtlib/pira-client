import React from "react";
import { Footer } from "../components/Footer/Footer";
import RegisterForm from "../components/Forms/RegisterForm/RegisterForm";
import Navigation from "../components/Navigation/Navigation";

export default function Register() {
    return (
        <>
            <Navigation />
            <RegisterForm />
            <Footer />
        </>
    )
}