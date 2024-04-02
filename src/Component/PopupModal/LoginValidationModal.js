/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reSetPopupReducerData } from "../../store/reducer";

function LoginValidationModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false, message = "" } = PopupReducer?.modal;
  console.log({ message });
  let loginAccess = localStorage.getItem("token");

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData({ modalType: "LOGIN", showModal: false }));
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={showModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="text-center my-3">
            <img
              className="my-5 "
              src={
                loginAccess
                  ? "../../images/success.png"
                  : "../../images/icon1.png"
              }
              style={{ width: "10vw" }}
            />
          </div>
          <div className="my-3 text-center">
            <h4 className="card-title1 text-center"> {message}</h4>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around px-5 buttons pb-4 ${"saveBtn"}`}
            style={{ marginTop: "100px" }}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={handleClosePopup}
            >
              {loginAccess ? "Okay" : "Try again"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginValidationModal;
