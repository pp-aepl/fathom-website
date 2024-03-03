import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetpopupReducerData } from "../../../../store/reducer";

function ProceedCommodityModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { proceedCommodityModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({
        modalType: "PROCEED",
        proceedCommodityModal: false,
      })
    );
  };

  const navigateToAgreement = (item) => {
    navigate("/admin/application/murabaha");
    dispatch(
      SetpopupReducerData({ modalType: "MURABAHA", murabahaModal: true })
    );
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={proceedCommodityModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Title>
          <img
            src="../../images/icon2.png"
            style={{ height: "100px", paddingLeft: "19rem" }}
          />
        </Modal.Title>

        <Modal.Body className="p-5">
          <div className="">
            <span style={{ paddingLeft: "9rem", fontWeight: "600" }}>
              Commodity purchase has been completed
            </span>
            <p style={{ textAlign: "center", paddingLeft: "4rem" }}>
              Continue with Murabaha Agreement Generation
            </p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button onClick={(e) => navigateToAgreement(e, "commodity")}>
              Continue
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProceedCommodityModal;
