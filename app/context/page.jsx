'use client'

import React, { useState } from 'react'
import { createContext } from 'react';
import Login from "../login/_components/Login";
import Otp from "../login/_components/Otp";
import Reset from "../login/_components/Reset";
// import Recovery from "../login/_components/Recovery"



export const RecoveryContext = createContext(
    {
        page: "login",
        setPage: () => { },
        email: "",
        setEmail: () => { },
        otp: "",
        setOtp: () => { },
    }
);
const Page = () => {
    const [page, setPage] = useState("login");
    const [emails, setEmails] = useState("");
    const [otp, setOtp] = useState("");

    function NavigateComponents() {
        if (page === "login") return <Login />;
        if (page === "otp") return <Otp />
        if (page === "reset") return <Reset />;

        return <Login />
    }

    return (
        <>
            <RecoveryContext.Provider
                value={{ page, setPage, emails, setEmails, otp, setOtp }}
            >
                <div className="flex justify-center items-center">
                    <NavigateComponents />
                </div>

            </RecoveryContext.Provider>
        </>
    )
}

export default Page