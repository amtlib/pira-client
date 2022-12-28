import React from "react";
import RegisterForm from "../components/Forms/RegisterForm/RegisterForm";
import { BasicLayout } from "../layouts/BasicLayout";

export default function Register() {
    return (
        <BasicLayout>
            <RegisterForm />
        </BasicLayout>
    )
}