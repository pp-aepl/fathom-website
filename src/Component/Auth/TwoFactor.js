import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Sidebar/Nabvar/Header";
import permissions from "../../Config/Config.json";
function TwoFactor() {
  console.log({ permissions });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inpData, setInpData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // console.log(AuthAdmin,"AuthAdminUser")
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...inpData };
    localStorage.setItem("cred", JSON.stringify(payload));
    // window.location.href = '/sidebar';
    navigate("/admin/dashboard");

    // setIsLoading(true);
    // try {
    //   let err = validateAll();
    //   if (isValid(err)) {
    //     await ADMINAPI({
    //       url: adminApiUrl.login,
    //       method: "POST",
    //       body: { ...inpData },
    //     })
    //       .then(async (data) => {
    //         if (data?.status || data?.status === true) {
    //           const token = data?.token;
    //           const accessToken = data?.accessToken;
    //           const roleId = data?.response?.roleID?._id;
    //           toast.success(data?.message);
    //           if (!token) {
    //             setApiErrors({ message: validationMessages.unableToLogin });
    //             return;
    //           }
    //           let isValidUser = data.response;
    //           localStorage.clear();
    //           storage().set("admintoken", token);
    //           storage().set("adminaccesstoken", accessToken);
    //           storage().set("roleId", roleId);
    //           storage().set("cred", JSON.stringify(inpData));
    //           // console.log(data.response              ,"datadatadata");
    //           dispatch(SetAuthAdminData(data?.response));
    //           dispatch(SetAuthUserData(data?.response));
    //           await fetchLocationList();
    //           dispatch(
    //             SetpopupReducerData({
    //               modalType: "NEWPASSWORD",
    //               showModal: true,
    //             })
    //           );
    //           setTimeout(() => {
    //             if (isValidUser?.firstName && isValidUser?.contact?.mobile) {
    //               navigate.push("/admin/dashboard/main", { scroll: false });
    //               // console.log(isValidUser?.firstName, isValidUser?.lastName, isValidUser?.contact?.mobile, "userData is avilable");
    //             } else {
    //               // console.log("userData is not avilable");
    //               navigate.push("/admin/dashboard/additional-details", {
    //                 scroll: false,
    //               });
    //             }
    //           }, 200);
    //         } else {
    //           toast.error(data?.message);
    //           setApiErrors({ message: data?.message });
    //           dispatch(SetAuthAdminData({}));
    //         }
    //       })
    //       .catch((err) => {
    //         toast.error("Invaild credentials for brand admin");
    //       });
    //   } else {
    //     setErrors({ ...err });
    //     // setApiErrors({ message: error?.message });
    //     // dispatch(SetloaderData(false));
    //   }
    // } catch (error) {
    //   // toast.error(error);
    //   // setApiErrors({ message: error?.message });
    //   // dispatch(SetloaderData(false));
    // }
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

  return (
    <>
      <section className="adminLogin my-5">
        <div className="container">
          <div
            className="row justify-content-center"
            style={{ marginTop: "90px" }}
          >
            <div className="">
              <div className="">
                <div className="row">
                  <div className="col-md-4">
                    <div className="py-5 my-5 ps-4 pe-3">
                      <h3 className="auth-title">Two-Factor authentication</h3>
                      <p className="auth-subtitle mb-5">
                        Enter the 6-digit code generated by your app to confirm
                        your action.
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
                            className="form-control"
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

                        <div className="form-group forget-password text-end mt-3 forgot"></div>
                        <div className="form-group mt-lg-4 my-3">
                          <button
                            className="login100-form-btn"
                            onClick={handleSubmit}
                          >
                            Verify
                          </button>
                        </div>

                        <p className="">
                          Didn't receive code?
                          <Link
                            style={{ "text-decoration": "underline" }}
                            href="/admin/signup"
                          >
                            Resend the code
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                  {/* <div className="col-md-8 d-none d-md-block">
                    <div className="footBallImg">
                      <img
                        className="img-fluid"
                        src="../../../images/logo2.jpeg"
                        alt=""

                      />
                    </div>
                  </div> */}
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
