import axios from "axios";
import React from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../context/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

export default function () {
  const { setPage, setEmail, email, setOtp } = useContext(RecoveryContext);

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
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
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
                </div>


                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                </div>


                <div className="form-outline mb-3">
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center">

                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body"
                    onClick={() => nagigateToOtp()}
                  >Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                    className="link-danger">Register</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>

      </section>


      <div class="container p-5">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-5 mt-5">
            <div class="bg-white p-5 rounded-3 shadow-sm border">
              <div>
                <p class="text-center text-success" style={{fontSize: "5.5rem"}}><i class="fa-solid fa-envelope-circle-check"></i></p>
                <p class="text-center text-center h5 ">Please check your email</p>
                <p class="text-muted text-center">We've sent a code to contact@curfcode.com</p>
                <div class="row pt-4 pb-2">
                  <div class="col-3">
                    <input class="otp-letter-input" type="text"/>
                  </div>
                  <div class="col-3">
                    <input class="otp-letter-input" type="text"/>
                  </div>
                  <div class="col-3">
                    <input class="otp-letter-input" type="text"/>
                  </div>
                  <div class="col-3">
                    <input class="otp-letter-input" type="text"/>
                  </div>
                </div>
                <p class="text-muted text-center">Didn't get the code? <a href="#" class="text-success">Click to resend.</a></p>

                <div class="row pt-5">
                  <div class="col-6">
                    <button class="btn btn-outline-secondary w-100">Cancel</button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-success w-100">Verify</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}