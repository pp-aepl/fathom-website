/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import permissions from "../../Config/Config.json";
import { useDispatch } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
function TwoFactor() {
  console.log({ permissions });
  const [second, setSecond] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inpData, setInpData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(AuthAdmin,"AuthAdminUser")
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...inpData };
    localStorage.setItem("cred", JSON.stringify(payload));
    dispatch(
      SetpopupReducerData({
        message: "Verification Successful",
        modalType: "LOGIN",
        showModal: true,
      })
    );
    navigate("/admin/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    // handleValidate(e);
    // setApiErrors({ message: "" });
    //setPassword();  //update here need to ask
  };

  // const handleValidate = (e) => {
  //   const errors1 = {};
  //   switch (e.target.name) {
  //     case "email":
  //       errors1.email = validateEmail(e.target.value);
  //       break;
  //     case "password":
  //       errors1.password = validateRequirePass(e.target.value);
  //       break;
  //     default:
  //       break;
  //   }
  //   setErrors(errors1);
  // };
  // const validateAll = () => {
  //   let err1 = {};
  //   err1.email = validateEmail(inpData.email);
  //   err1.password = validateRequirePass(inpData.password);
  //   return err1;
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }

      if (second === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [second]);
  return (
    <>
      <section className="adminLogin">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              <div className="">
                <div className="row">
                  <div className="col-md-4" style={{ marginTop: "20vh" }}>
                    <div className="otp py-5 my-5 ps-4 pe-3">
                      <h3 className="card-title">
                        Enable Two Factor Authentication
                      </h3>
                      <p className=" auth-subtitle mb-5">
                        Please enter code received on your authenticator app
                      </p>
                      <form
                        action=""
                        method="post"
                        onSubmit={handleSubmit}
                        onKeyDown={handleKeyDown}
                      >
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control p-3 rounded border"
                            name="email"
                            placeholder="Enter OTP"
                            autoComplete={false}
                            required
                            value={inpData.email}
                            onChange={handleChange}
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
                      )} */}
                        <div
                          className="resend-time my-4 d-flex"
                          style={{ maxHeight: "25px" }}
                        >
                          {second > 0 ? (
                            <>
                              <p className="remainingTime ">
                                {`${second < 10 ? "0" + second : second}`}{" "}
                              </p>
                              <p className="remainingText auth-subtitle mx-2">
                                {`Seconds left`}{" "}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="auth-subtitle">
                                Didn`t receive code?
                                <Link
                                  style={{ textDecoration: "underline" }}
                                  to="/login"
                                  className="mx-2 text-primary"
                                >
                                  Resend the code
                                </Link>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="form-group forget-password text-end mt-3 forgot"></div>

                        <p className="auth-subtitle">
                          Use another way to authenticate?
                          <Link
                            style={{ textDecoration: "underline" }}
                            to="/admin/signup"
                            className="mx-2 text-primary"
                          >
                            Click here
                          </Link>
                        </p>

                        <div
                          className="form-group mt-lg-4 "
                          style={{ marginTop: "7rem" }}
                        >
                          <button
                            className="login100-form-btn"
                            onClick={handleSubmit}
                          >
                            Verify
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TwoFactor;
