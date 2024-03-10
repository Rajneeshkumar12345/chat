import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { RecoveryContext } from "../../context/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';

export default function () {
  const { setPage, emails, setEmails, setOtp } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(email, password, "11");
    if (!email || !password) {
      toast.error("Enter a valid email or password")
      return;
    }
    try {
      const resp = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
      const data = await resp.json();
      if (resp.ok) {
        toast.success("Login Successfully")
      }
      console.log(data, "Login Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error)
      return;
    }
  }

  function nagigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      // console.log(OTP, "OTP is here");
      setOtp(OTP);

      axios
        .post("http://localhost:4000/api/auth/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => setPage("otp"))
        .catch(console.log);
      return;
    }
    return toast.error("Please enter your email");
  }
  return (
    <div>
      <section className="vh-100 py-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div> */}


                <div className="form-outline mb-4">
                  <label className="form-label" >Email address</label>
                  <input type="email" className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>


                <div className="form-outline mb-3">
                  <label className="form-label" >Password</label>
                  <input type="password" className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">

                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" />
                    <label className="form-check-label" >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body"
                    onClick={() => nagigateToOtp()}
                  >Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                    className="link-danger">Register</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}