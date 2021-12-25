import React from "react";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import Navigation from "../components/Navigation/Navigation";

export default function Login() {
    return (
        <>
            <Navigation />
            <LoginForm onSubmit={() => console.log("XD")} />
        </>
    )
}