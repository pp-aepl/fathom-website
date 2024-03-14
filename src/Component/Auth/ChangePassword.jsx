import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  isValid,
  validateCPassWord,
  validateEmail,
  validatePassWord,
} from "../Common/Validation/Validation";
import { useDispatch } from "react-redux";
import { SetloaderData } from "../../store/reducer";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [inpData, setInpData] = useState({ newPassword: "", cnewPassword: "" });
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
    err1.newPassword = validatePassWord(inpData.newPassword);
    err1.cnewPassword = validateCPassWord(
      inpData.cnewPassword,
      inpData.newPassword
    );
    return err1;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        dispatch(SetloaderData(true));
        await API({
          url: `${apiURl.reset}/${_id}`,
          method: "POST",
          body: { ...inpData },
        }).then((data) => {
          if (data?.status || data?.status === true) {
            navigate("/login");
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
                  <div className="col-md-4 login_sec">
                    <div className="py-5 ps-4 pe-3">
                      <h1>Set new password</h1>
                      <p className="auth-subtitle mb-5">
                        Your new password must be different to previously used
                        passwords.
                      </p>

                      <>
                        <div className="form-group position-relative">
                          <label>Password</label>

                          <input
                            className="p-2 mb-4 rounded w-100 border"
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            autoComplete={false}
                            required
                            value={inpData.newPassword}
                            onChange={handleChange}
                            onBlur={handleValidate}
                          />
                        </div>

                        {errors.newPassword ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.newPassword}
                          </span>
                        ) : (
                          <span
                            className=""
                            style={{ fontSize: "14px", color: "#757575" }}
                          >
                            Must be at least 8 characters.
                          </span>
                        )}
                        <div className="form-group position-relative">
                          <label>Confirm password</label>

                          <input
                            className="p-2 mb-4 rounded w-100 border"
                            type="password"
                            name="cnewPassword"
                            placeholder="Confirm New Password"
                            autoComplete={false}
                            required
                            value={inpData.cnewPassword}
                            onChange={handleChange}
                            onBlur={handleValidate}
                          />
                        </div>

                        {errors.cnewPassword ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.cnewPassword}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePassword;
