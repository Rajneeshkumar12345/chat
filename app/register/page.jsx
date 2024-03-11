'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from 'next/navigation';


const Page = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, phone, password, 'Data');

        try {
            const resp = await axios.post("http://localhost:4000/api/auth/register", {
                name,
                email,
                phone,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (resp.status === 200) {
                setName("");
                setEmail("");
                setPassword("");
                setPhone("");
                toast.success("User SignUp Successfully");
                setTimeout(() => {
                    router.push("/login")
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to sign up user");
        }
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-100 py-5">
                <div className="col-md-5 mx-auto">
                    <h2 className="mb-5">Registration Form</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback text-red">Please provide a valid name.</div>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                maxLength="10"
                            />
                            <div className="invalid-feedback text-red">Please provide a valid phone number.</div>
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control shadow-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Please provide a valid email address.</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control shadow-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Please provide a valid password.</div>
                        </div>
                        <div className="buttons d-grid">
                            <button type="submit" className="btn btn-primary">Sign up</button>
                        </div>
                        <div className="Account" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "10px" }}>
                            <p>I have already an account <a href="/login" className='link-primary fw-bold'>Login</a></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
