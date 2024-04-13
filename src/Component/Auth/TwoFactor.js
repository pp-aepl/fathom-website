/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetAuthUserData, SetpopupReducerData } from "../../store/reducer";
import { toast } from "react-toastify";
import apiURl, { validationMessages } from "../../store/actions/api-url";
import { isValid, validateOTP } from "../Common/Validation/Validation";
import { API } from "../../apiwrapper";
import { Spinner } from "react-bootstrap";
function TwoFactor() {
  const [second, setSecond] = useState(30);
  const { authUser } = useSelector((state) => state);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let secretKey = searchParams.get("secretKey") ?? "";

  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inpData, setInpData] = useState({ otp: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateAll = () => {
    let err1 = {};
    err1.otp = validateOTP(inpData.otp);
    return err1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let err = validateAll();
      if (isValid(err)) {
        setIsLoading(true);
        let payload = {
          ...inpData,
          secretKey: secretKey,
          IsEnable: true,
        };
        await API({
          url: `${apiURl.verifyOtp}/${authUser?.data?._id}`,
          method: "POST",
          body: { ...payload },
        }).then(async (data) => {
          console.log(data, "loginData");
          if (data?.status || data?.status === true) {
            const token = data?.data?.token;
            if (!token) {
              setApiErrors({ message: validationMessages.unableToLogin });
              return;
            }

            dispatch(SetAuthUserData(data?.data));

            localStorage.clear();
            localStorage.setItem("token", token);

            dispatch(
              SetpopupReducerData({
                message: "Verification Successful",
                modalType: "LOGIN",
                showModal: true,
              })
            );
            navigate("/admin/dashboard");
          } else {
            toast.error(data?.message);
            setApiErrors({ message: data?.message || data?.error });
          }
        });
      } else {
        setErrors(err);
      }
    } catch (error) {
      toast.error(error);
      setApiErrors({ message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
    setApiErrors({ message: "" });
  };

  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "otp":
        errors1.otp = validateOTP(e.target.value);
        break;

      default:
        break;
    }
    setErrors(errors1);
  };

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
                            type="number"
                            className="form-control p-3 rounded border"
                            name="otp"
                            placeholder="Enter OTP"
                            autoComplete={false}
                            required
                            inputMode="numeric"
                            value={inpData.otp}
                            onChange={handleChange}
                            onBlur={handleValidate}
                          />
                        </div>
                        {errors.otp ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.otp}
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
                            disabled={isLoading}
                          >
                            {isLoading ? <Spinner /> : "Verify"}
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
