import React from "react";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { BasicLayout } from "../layouts/BasicLayout";

export default function Login() {
    return (
        <BasicLayout page="login">
            <LoginForm />
        </BasicLayout>
    )
}