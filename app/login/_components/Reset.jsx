import React from 'react';
import { useContext } from 'react';
import { RecoveryContext } from '../../context/RecoveryContext';
import toast from 'react-hot-toast';

function ChangePasswordForm() {
  const { setPage } = useContext(RecoveryContext);

  function changePassword() {
    toast.success("Password successfully set")
    setPage("login");
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card card-outline-secondary">
            <div className="card-header">
              <h3 className="mb-0">Change Password</h3>
            </div>
            <div className="card-body p-5">
              <form className="form" role="form" autoComplete="off">
                <div className="form-group">
                  <label htmlFor="inputPasswordNew">New Password</label>
                  <input type="password" className="form-control" id="inputPasswordNew" required />
                  <span className="form-text small text-muted">
                    The password must be 8-20 characters, and must <em>not</em> contain spaces.
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPasswordNewVerify">Confirm Password</label>
                  <input type="password" className="form-control" id="inputPasswordNewVerify" required />
                  <span className="form-text small text-muted">
                    To confirm, type the new password again.
                  </span>
                </div>
                <div className="form-group d-grid">
                  <button type="submit" className="btn btn-success btn-lg"
                    onClick={() => changePassword()}
                  >Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
