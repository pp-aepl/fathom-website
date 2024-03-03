import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";

function MurabahaSuccessfully() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { murabahaSuccessModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "GENRATEFILES", murabahaSuccessModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    // dispatch(
    //   SetpopupReducerData({ modalType: "FILESCONFIRM", showConfirmModal: true })
    // );
    navigate("/admin/application/sent");
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={murabahaSuccessModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="p-5">
          <div className="">
            <img
              src="../../images/icon2.png"
              style={{ height: "100px", paddingLeft: "19rem" }}
            />
          </div>
          <div>
            <h3 style={{ textAlign: "center" }}>
            Murabaha Agreements have
been sent to selected channels
            </h3>
           
          </div>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "create")}
            >
              Okey
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MurabahaSuccessfully