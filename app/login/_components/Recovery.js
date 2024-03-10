import Link from "next/link";
import React from "react";

export default function Recovered() {
    return (
        <section className="h-screen d-flex align-items-center">
            <div className="container">
                <div className="row flex justify-content-center align-items-center vh-100">
                    <div className="col-md-6">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-100"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-6">
                        <form>
                            <div className="text-center mb-4">
                                <h1 className="text-2xl font-bold mb-0">
                                    Password successfully set
                                </h1>
                            </div>
                            <div className="text-center mb-4">
                                <Link href="/login"><h2>Welcome HOME</h2></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
