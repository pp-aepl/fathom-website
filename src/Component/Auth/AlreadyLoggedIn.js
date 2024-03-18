/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOut } from "../../Config/CommonFunction";

function AlreadyLoggedIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);

  const handleLogoutUser = () => {
    dispatch(handleLogOut());
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <>
      <div
        className="container m-5 text-center"
        style={{ padding: "100px", margin: "130px" }}
      >
        <h2 className="m-4 ">You are already logged in!</h2>
        <p className="m-4">You can go back your page from the link below:</p>
        <button
          onClick={() => navigate(-2)}
          className="btn btn-primary m-5"
        >
          Go Back
        </button>
        <button onClick={handleLogoutUser} className="btn btn-danger m-5">
          Log Out
        </button>
      </div>
    </>
  );
}

export default AlreadyLoggedIn;
