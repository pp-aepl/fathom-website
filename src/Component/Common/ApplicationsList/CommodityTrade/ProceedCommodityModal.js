/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../../../store/reducer";
import { API } from "../../../../apiwrapper";
import { apiURl } from "../../../../store/actions";
import { BASE_CONFIG } from "../../../../Config";

function ProceedCommodityModal() {
  const dispatch = useDispatch();
  const { PopupReducer,Loader } = useSelector((state) => state);
  const { showModal = false, selectedApplication } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "COMMODITY_PURCHASE_CONFIRMED",
        portal_id: BASE_CONFIG?.APP_PORTAL_ID

      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        dispatch(
          SetpopupReducerData({
            ...PopupReducer?.modal,
            modalType: "MURABAHA",
            showModal: true,
          })
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };

  const handleContinue = () => {
    handleProcess();
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
              onClick={(e) => handleContinue(e)}
              className="login100-form-btn"
              disabled={Loader?.data || false}
            >
              {Loader?.data ? <Spinner /> : "Continue"}
              
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProceedCommodityModal;
