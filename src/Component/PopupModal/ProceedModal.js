/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessfullyModal from "./SuccessfullyModal";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { BASE_CONFIG } from "../../Config";
function ProceedModal() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const {
    showModal = false,
    successModal = false,
    selectedApplication = [],
  } = PopupReducer?.modal;
  const APP_PLATFORM = BASE_CONFIG.APP_PLATFORM;

  const [showCommodityModal, setShowCommodityModal] = useState(false);
  const commodityType = PopupReducer?.modal?.type; // COMIDITYAGENT
  const navigate = useNavigate();
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  console.log(commodityType, "");
  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        showStatus: "Pending",
        status:
          commodityType === "COMIDITYAGENT"
            ? "COMMODITY_SALE_CONFIRMED"
            : "PROCESSING_COMMODITY_PURCHASE",
        portal_id: BASE_CONFIG?.APP_PORTAL_ID,
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        // setTimeout(() => {
        //   navigate("/admin/application/list");
        //   dispatch(
        //     SetpopupReducerData({
        //       ...PopupReducer?.modal,
        //       modalType: "ProceedCommodity",
        //       showModal: true,
        //     })
        //   );
        // }, 2000);
        if (commodityType === "COMIDITYAGENT") {
          let path = "/admin/application/commodity";
          navigate(path);
          dispatch(
            SetpopupReducerData({
              modalType: "SUCCESSFULLY",
              successModal: true,
              type: "COMIDITYAGENT",
            })
          );
        } else {
          dispatch(
            SetpopupReducerData({
              ...PopupReducer?.modal,
              modalType: "",
              showModal: false,
            })
          );

          navigate("/admin/application/inProcess");
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  // update create api
  const handleYesButton = async (e) => {
    e.preventDefault();
    if (commodityType === "APP_PROCEED") {
      dispatch(
        SetpopupReducerData({
          modalType: "PROCEED",
          proceedModal: false,
          type: "APP_PROCEED",
        })
      );
    }
    if (APP_PLATFORM === "INTELLISCAN") {
      dispatch(
        SetpopupReducerData({
          modalType: "PROCEED_ALL_CASE",
          showModal: true,
          selectedApplication: selectedApplication,
          // status: value,
        })
      );
    } else {
      setShowCommodityModal(true);
      // dispatch(
      //   SetpopupReducerData({ modalType: "PROCEED", proceedModal: false })
      // );
    }
  };
  // const submit comidity
  const handleConfirmProceed = async (e) => {
    e.preventDefault();

    await handleProcess();
  };

  return (
    <>
      {successModal && <SuccessfullyModal />}

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
                src="../../../images/exclaim.png"
                style={{ height: "120px" }}
              />
            </div>
            {showCommodityModal || commodityType === "APP_PROCEED" ? (
              <>
                <h3 className="card-title">Proceed Commodity</h3>
                <p className="card-text">
                  Commodity purchase will be executed
                  <br /> now for all the approved cases.
                </p>
              </>
            ) : (
              <h3 className="h2 card-title mb-2">
                Are you sure you want <br />
                to Proceed?
              </h3>
            )}
          </div>
          <div
            style={{ marginTop: "100px" }}
            className={`d-flex align-items-center justify-content-around buttons py-4   saveBtn`}
          >
            <button className="w-50 me-4" onClick={handleClosePopup}>
              No
            </button>
            {showCommodityModal ||
            commodityType === "APP_PROCEED" ||
            commodityType === "COMIDITYAGENT" ? (
              <button
                className="w-50 me-4"
                onClick={(e) => handleConfirmProceed(e)}
                disabled={Loader?.data || false}
              >
                {Loader?.data ? <Spinner /> : "Confirm"}
              </button>
            ) : (
              <button
                className="w-50"
                onClick={(e) => handleYesButton(e)}
                disabled={Loader?.data || false}
              >
                {Loader?.data ? <Spinner /> : "Yes"}
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProceedModal;
