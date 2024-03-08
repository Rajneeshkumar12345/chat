// 'use client'

// import React, { useState } from 'react'
// import Login from './_components/Login';
// import Otp from './_components/Otp';
// import Reset from './_components/Reset';
// import Recovery from "./_components/Recovery"
// import { createContext } from 'react';

// export const RecoveryContext = createContext();
// const Page = () => {
//     const [page, setPage] = useState("login");
//     const [email, setEmail] = useState();
//     const [otp, setOtp] = useState();

//     function NavigateComponents() {
//         if (page === "login") return <Login />;
//         if (page === "otp") return <Otp />
//         if (page === "reset") return <Reset />;

//         return <Recovery />
//     }

//     return (
//         <>
//             <RecoveryContext.Provider
//                 value={{ page, setPage, email, setEmail, otp, setOtp }}
//             >
//                 <div className="flex justify-center items-center">
//                     <NavigateComponents />
//                 </div>

//             </RecoveryContext.Provider>
//         </>
//     )
// }

// export default Page

import React from 'react'
import Context from "../context/page"

const page = () => {
    return (
        <>
            <Context />

        </>
    )
}

export default page