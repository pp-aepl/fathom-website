import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isValid, validateEmail } from "../Common/Validation/Validation";
import { useDispatch } from "react-redux";
import { SetloaderData } from "../../store/reducer";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [inpData, setInpData] = useState({ email: "" });
  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
    setApiErrors({ message: "" });
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "email":
        errors1.email = validateEmail(e.target.value);
        break;

      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};
    err1.email = validateEmail(inpData.email);
    return err1;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        dispatch(SetloaderData(true));
        await API({
          url: apiURl.forgot,
          method: "POST",
          body: { ...inpData },
        }).then((data) => {
          if (data?.status || data?.status === true) {
            // console.log(data);
            setIsSent(true);
          } else {
            // dispatch(SetAuthUserData({}));
          }
        });
        dispatch(SetloaderData(false));
      } else {
        setErrors(err);
      }
    } catch (error) {
      setApiErrors({ message: error.message });
    } finally {
      dispatch(SetloaderData(false));
    }
  };

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
                          We sent a password reset link to {inpData?.email}
                        </p>

                        <>
                          <div className="form-group forget-password text-end mt-3 forgot"></div>
                          <div className="form-group mt-lg-4 mt-3">
                            <button
                              className="login100-form-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `mailto:${inpData?.email}`;
                              }}
                            >
                              Open email app
                            </button>
                          </div>
                          <p className="trabble">
                            Didn't receive the email?{" "}
                            <Link to={"#"} onClick={handleSubmit}>
                              Click to resend
                            </Link>
                          </p>
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
                          <div className="form-group position-relative">
                            <label>Your email address</label>

                            <input
                              className="p-2 mb-4 rounded w-100 border"
                              type="email"
                              name="email"
                              placeholder="example@gmail.com"
                              autoComplete={false}
                              required
                              value={inpData.email}
                              onChange={handleChange}
                              onBlur={handleValidate}
                            />
                          </div>

                          {errors.email ? (
                            <span
                              className="text-danger"
                              style={{ fontSize: "14px" }}
                            >
                              {errors.email}
                            </span>
                          ) : (
                            ""
                          )}

                          {apiErrors.message ? (
                            <span
                              className="text-danger"
                              style={{ fontSize: "14px" }}
                            >
                              {apiErrors.message}
                            </span>
                          ) : (
                            ""
                          )}
                          <div className="form-group forget-password text-end mt-3 forgot"></div>
                          <div className="form-group mt-lg-4 mt-3">
                            <button
                              className="login100-form-btn"
                              onClick={handleSubmit}
                            >
                              Reset password
                            </button>
                          </div>
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
