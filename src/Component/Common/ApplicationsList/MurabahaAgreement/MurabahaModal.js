import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetpopupReducerData } from "../../../../store/reducer";
function MurabahaModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { murabahaModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "MURABAHA", murabahaModal: false })
    );
  };

  // update create api
  const onSubmitProceed = async (e, typeSubmit) => {
    e.preventDefault();
    handleClosePopup();
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={murabahaModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
      
        <Modal.Body className="p-5">
          <img
            className="notepad"
            style={{ height: "100px", paddingLeft: "18rem" }}
            src="../../images/notepad.png"
          />

          <div className="">
            <span style={{ paddingLeft: "12rem", fontWeight: "600" }}>
              Murabaha Agreement Generated
            </span>
            <p style={{ textAlign: "center", paddingLeft: "4rem" }}>
              Commodity Purchase has been completed, do you want to Export
              Agreement for all approved customers?
            </p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ width: "25rem" }}
              onClick={(e) => handleClosePopup(e, "cancel")}
            >
              No-save to proceed later
            </button>
            <button onClick={(e) => onSubmitProceed(e, "create")}>
              Proceed
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MurabahaModal;
