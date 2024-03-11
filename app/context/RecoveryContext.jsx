'use client'

import React, { useContext, useState } from 'react'
import { createContext } from 'react';


export const RecoveryContext = createContext(null);

const Page = ({ children }) => {
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    return (
        <>
            <RecoveryContext.Provider
                value={{ page, setPage, email, setEmail, otp, setOtp }}
            >
                {children}

            </RecoveryContext.Provider>
        </>
    )
}

export const useRecoveryContext = () => useContext(RecoveryContext)

export default Page;