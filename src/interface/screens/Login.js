import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import LoginForm from "../components/LoginForm";
import GuestForm from "../components/GuestForm";
import { Redirect } from "react-router";

export default function Login() {
    const [formToLoad, setForm] = useState(null);
    const [isAuthinticated, setAuth] = useState(false);

    const onSuccess = (loginResponse) => {
        localStorage.setItem("token", loginResponse?.token);
        localStorage.setItem("user_id", loginResponse?.user_id);
        setAuth(true);
    };

    const onClickRegister = () => {

    };
    const onGuestClick = () => {
        setForm(renderGuestForm());
    };
    
    const renderLoginForm = () => (
        <LoginForm
            onRegisterClick={onClickRegister}
            onGuestClick={onGuestClick}
            onSuccess={onSuccess}
        />);
    
    const renderGuestForm = () => <GuestForm onSuccess={onSuccess}/>
    
  
    useEffect(()=>{
        setForm(renderLoginForm());
    }, []);

    return (
    <>
        {isAuthinticated ? <Redirect to="/" /> : null}
        <MainContainer py="5">
            <div className="row">
                <div className="col-md-6 offset-md-3 py-4 px-5 shadow-lg">
                    {formToLoad}
                </div>
            </div>
        </MainContainer>
    </>
    );
}