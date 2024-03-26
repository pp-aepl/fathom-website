import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";

function LogoutModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { logoutModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "LOGOUT", logoutModal: false }));
  };

  const onSubmit = async (type) => {
    console.log(type, "17");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={logoutModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <h3>
              LOGOUT <i className="fa fa-lock"></i>
            </h3>
            <p style={{ textAlign: "center" }}>
              Are you sure you want to log-off?
            </p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "create")}
            >
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogoutModal;
