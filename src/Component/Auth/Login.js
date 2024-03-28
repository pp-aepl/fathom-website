/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Sidebar/Nabvar/Header";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isValid, validateEmail } from "../Common/Validation/Validation";
import { SetloaderData, SetpopupReducerData } from "../../store/reducer";
import { validationMessages } from "../../store/actions/api-url";
import LoginValidationModal from "../PopupModal/LoginValidationModal";
import { SetAuthUserData } from "../../store/reducer/authUser";

// import { SetpopupReducerData } from "../../store/reducer";
// import LogoutModal from "../PopupModal/LogoutModal";

function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [errors, setErrors] = useState({});
  const [showQRcode, setShowQRcode] = useState(false);

  const { PopupReducer } = useSelector((state) => state);
  // const { logoutModal = false } = PopupReducer?.modal;
  const { loginValidationModal = false } = PopupReducer?.modal;

  const dispatch = useDispatch();

  const [inpData, setInpData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // console.log(AuthAdmin,"AuthAdminUser")
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(SetpopupReducerData({ modalType: "LOGOUT", logoutModal: true }));
    // setShowQRcode(true); // for two factor
    //  navigate("/admin/dashboard");
    //  handleLogin({  ...inpData});
    try {
      let err = validateAll();
      if (isValid(err)) {
        dispatch(SetloaderData(true));

        await API({
          url: apiURl.login,
          method: "POST",
          body: { ...inpData },
        }).then((data) => {
          console.log(data, "loginData");
          if (data?.status || data?.status === true) {
            const token = data?.token;
            if (!token) {
              setApiErrors({ message: validationMessages.unableToLogin });
              return;
            }
            dispatch(SetAuthUserData(data?.data));
            setShowQRcode(true);
            localStorage.clear();
            localStorage.setItem("token", token);
            localStorage.setItem("cred", JSON.stringify(inpData));

            // dispatch(
            //   // SetpopupReducerData({ modalType: "NEWPASSWORD", showModal: true })
            // );
          } else {
            toast.error(data?.message);
            setApiErrors({ message: data?.message });
            dispatch(
              SetpopupReducerData({
                modalType: "LOGIN",
                loginValidationModal: true,
                type: data?.message,
              })
            );

            // dispatch(SetAuthUserData({}));
          }
        });

        dispatch(SetloaderData(false));
      } else {
        setErrors(err);
        dispatch(
          SetpopupReducerData({
            modalType: "LOGIN",
            loginValidationModal: true,
            type: "User name or Password Invalid",
          })
        );
      }
    } catch (error) {
      toast.error(error);
      setApiErrors({ message: error.message });
      dispatch(
        SetpopupReducerData({
          modalType: "LOGIN",
          loginValidationModal: true,
          type: error?.response?.data?.message,
        })
      );

      dispatch(SetloaderData(false));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
    setApiErrors({ message: "" });
    //setPassword();  //update here need to ask
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <>
      {loginValidationModal && <LoginValidationModal />}
      <section className="adminLogin">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              <div className="">
                <div className="row">
                  <div className="col-md-4 login_sec">
                    <div className="py-5 ps-4 pe-3">
                      <h3>
                        {showQRcode
                          ? `Enable Two Factor Authentication`
                          : "Welcome back."}
                      </h3>
                      {showQRcode ? (
                        <p className="auth-subtitle mb-5">
                          Please scan the QR code to generate
                          <br></br>a secure number.
                        </p>
                      ) : (
                        <p className="auth-subtitle mb-5">
                          To access your online banking, you'll need to log{" "}
                          <br></br>
                          in securely using your unique credentials.
                        </p>
                      )}
                      {showQRcode ? (
                        <>
                          <img
                            className="scanQr_code"
                            src="../../images/qrImage.png"
                            alt=""
                            width={90}
                          />
                          <br />

                          <Link to={"/otp"}>
                            <div className="form-group mt-lg-4 mt-3">
                              <button className="login100-form-btn">Next</button>
                            </div>
                          </Link>
                        </>
                      ) : (
                        <>
                          <form
                            action=""
                            method="post"
                            onSubmit={handleSubmit}
                            onKeyDown={handleKeyDown}
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
                                value={inpData.email}
                                onChange={handleChange}
                                onBlur={handleValidate}
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
                            {/* Login Hide and Show */}
                            <div className="form-group position-relative">
                              <label>Your password</label>
                              <input
                                type={showPassword ? "text" : "password"}
                                //type="password"
                                className="p-2 mb-2 rounded w-100 pr-4 border"
                                name="password"
                                placeholder=""
                                autoComplete={false}
                                required
                                // onChange={(e) => setPassword(e.target.value)}
                                value={inpData.password}
                                onChange={handleChange}
                                onBlur={handleValidate}
                              />

                              <div className="showPasswordLogin">
                                <span
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={
                                      showPassword
                                        ? "../../images/eye-regular.svg"
                                        : "../../images/eye-slash-regular.svg"
                                    }
                                    alt={
                                      showPassword
                                        ? "Hide Password"
                                        : "Show Password"
                                    }
                                    onClick={togglePasswordVisibility}
                                    width={20}
                                    height={20}
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
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
                                onClick={handleSubmit}
                              >
                                Log in
                              </button>
                            </div>

                            <p className="trabble">
                              <Link to={"/forgot-password"}>
                                Reset Password
                              </Link>
                            </p>
                          </form>
                        </>
                      )}
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

export default Login;
