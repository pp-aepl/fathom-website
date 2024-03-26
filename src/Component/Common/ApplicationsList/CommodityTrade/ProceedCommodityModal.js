/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../../../store/reducer";

function ProceedCommodityModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const navigateToAgreement = (item) => {
    navigate("/admin/application/murabaha");
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        modalType: "MURABAHA",
        showModal: true,
      })
    );
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
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="mb-5">
            <div className="text-center mb-2">
              <img src="../../images/icon2.png" style={{ height: "120px" }} />
            </div>
            <h3 className="card-title">
              Commodity purchase <br /> has been completed
            </h3>
            <p className="card-text">
              Continue with Murabaha
              <br /> Agreement Generation
            </p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 `}
            style={{ marginTop: "100px" }}
          >
            <button
              onClick={(e) => navigateToAgreement(e, "commodity")}
              className="login100-form-btn"
            >
              Continue
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProceedCommodityModal;
