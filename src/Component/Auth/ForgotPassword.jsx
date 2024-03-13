import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [isSent, setIsSent] = useState(false);

  return (
    <>
      <section className="adminLogin">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              <div className="">
                <div className="row">
                  {isSent ? (
                    <div className="col-md-4 login_sec">
                      <div className="py-5 ps-4 pe-3">
                        <h1>Check your email</h1>
                        <p className="auth-subtitle mb-5">
                          We sent a password reset link to markforest@gmail.com
                        </p>

                        <>
                          <form
                            action=""
                            method="post"
                            // onSubmit={handleSubmit}
                            // onKeyDown={handleKeyDown}
                          >
                            <div className="form-group forget-password text-end mt-3 forgot"></div>
                            <div className="form-group mt-lg-4 mt-3">
                              <button
                                className="login100-form-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href =
                                    "mailto:example@example.com";
                                }}
                              >
                                Open email app
                              </button>
                            </div>
                            <p className="trabble">
                              Didn't receive the email?{" "}
                              <Link to={"/forgot-password"}>
                                Click to resend
                              </Link>
                            </p>
                          </form>
                        </>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-4 login_sec">
                      <div className="py-5 ps-4 pe-3">
                        <h1>Forgot Password?</h1>
                        <p className="auth-subtitle mb-5">
                          No worries, well send you reset instructions.
                        </p>

                        <>
                          <form
                            action=""
                            method="post"
                            // onSubmit={handleSubmit}
                            // onKeyDown={handleKeyDown}
                          >
                            <div className="form-group position-relative">
                              <label>Your email address</label>

                              <input
                                className="p-2 mb-4 rounded w-100 border"
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                autoComplete={false}
                                required
                                // value={inpData.email}
                                // onChange={handleChange}
                                // onBlur={handleValidate}
                              />
                            </div>

                            {/* {errors.email ? (
                        <span
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.email}
                        </span>
                      ) : (
                        ""
                      )}  */}

                            {/* {apiErrors.message ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {apiErrors.message}
                          </span>
                        ) : (
                          ""
                        )} */}
                            <div className="form-group forget-password text-end mt-3 forgot"></div>
                            <div className="form-group mt-lg-4 mt-3">
                              <button
                                className="login100-form-btn"
                                onClick={() => setIsSent(true)}
                              >
                                Reset password
                              </button>
                            </div>
                          </form>
                        </>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
