/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";

function CommonResponsePopup() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const {
    modalType = "",
    showModal = false,
    message = "",
    status = false,
    title = "",
    callBack = () => {},
  } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({
        modalType: "",
        showModal: false,
        message: "",
        status: false,
        callBack: () => {},
      })
    );
  };

  const handleContinue = async () => {
    callBack();
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
          <div className="">
            <div className="text-center">
              <img
                className="success-pic"
                src={
                  status ? "../../images/success.png" : "../../images/icon1.png"
                }
              />
            </div>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <h3 style={{ textAlign: "center" }}>{message}</h3>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => handleContinue(e)}
            >
              Continue
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CommonResponsePopup;
