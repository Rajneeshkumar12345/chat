import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { RecoveryContext } from "../../context/page";
import toast from 'react-hot-toast';

export default function () {
  const { emails, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:4000/api/auth/send_recovery_email", {
        OTP: otp,
        recipient_email: emails,
      })
      .then(() => setDisable(true))
      .then(() => toast.success("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    toast.error(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);


  return (
    <>

      <div className="container p-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-5 mt-5">
            <div className="bg-white p-5 rounded-3 shadow-sm border">
              <div>
                <p className="text-center text-success" style={{ fontSize: "5.5rem" }}><i className="fa-solid fa-envelope-circle-check"></i></p>
                <p className="text-center text-center h5 ">Email Verification</p>
                <p className="text-muted text-center">We have sent a code to your email {emails}</p>
                <div className="row pt-4 pb-2">
                  <div className="col-3">
                    <input className="otp-letter-input" type="text"
                      maxLength="1"
                      onChange={(e) => setOTPinput([
                        e.target.value,
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                      ])}
                    />
                  </div>
                  <div className="col-3">
                    <input className="otp-letter-input" type="text"
                      maxLength="1"
                      onChange={(e) => setOTPinput([
                        OTPinput[0],
                        e.target.value,
                        OTPinput[2],
                        OTPinput[3],
                      ])}
                    />
                  </div>
                  <div className="col-3">
                    <input className="otp-letter-input" type="text"
                      maxLength="1"
                      onChange={(e) => setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        e.target.value,
                        OTPinput[3],
                      ])}
                    />
                  </div>
                  <div className="col-3">
                    <input className="otp-letter-input" type="text"
                      maxLength="1"
                      onChange={(e) => setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        e.target.value,
                      ])}
                    />
                  </div>
                </div>
                <p className="text-muted text-center">Didn't get the code? <a href="#" className="text-success"
                  style={{
                    color: disable ? "gray" : "blue",
                    cursor: disable ? "none" : "pointer",
                    textDecorationLine: disable ? "none" : "underline",
                  }}
                  onClick={() => resendOTP()}
                >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                </a></p>

                <div className="row pt-5">
                  <div className="col-6">
                    <button className="btn btn-outline-secondary w-100"
                    onClick={() => setPage("login")}
                    >Cancel</button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-success w-100"
                      onClick={() => verfiyOTP()}
                    >Verify Account</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}