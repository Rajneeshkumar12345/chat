'use client'

import React from 'react'
import RecoveryContext, { useRecoveryContext } from "../context/RecoveryContext"
import Login from './_components/Login'
import Otp from './_components/Otp'
import Reset from "./_components/Reset"


const Page = () => {
    const { setPage, page, email, setEmail, setOtp } = useRecoveryContext();

    function NavigateComponents() {
        if (page === "login") return <Login />;
        if (page === "otp") return <Otp />
        if (page === "reset") return <Reset />;

        return <Login />
    }

    return (

        <div>
            {NavigateComponents()}

        </div>

    )
}

export default Page