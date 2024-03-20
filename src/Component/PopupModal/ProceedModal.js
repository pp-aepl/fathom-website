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
import { useNavigate } from "react-router-dom";
import SuccessfullyModal from "./SuccessfullyModal";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
function ProceedModal() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const {
    showModal = false,
    successModal = false,
    selectedApplication = [],
  } = PopupReducer?.modal;

  const [commodityModal, setCommodityModal] = useState(false);
  const commodityType = PopupReducer?.modal?.type; // COMIDITYAGENT
  const navigate = useNavigate();
  console.log(commodityType, "");
  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "PROCESSING_COMMODITY_PURCHASE",
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
        navigate("/admin/application/inProcess");
        dispatch(
          SetpopupReducerData({
            ...PopupReducer?.modal,
            modalType: "",
            showModal: false,
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
  // update create api
  const onSubmitProceed = async (e, typeSubmit) => {
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
    if (typeSubmit === "create") {
      setCommodityModal(true);
    } else {
      setCommodityModal(false);
      dispatch(
        SetpopupReducerData({ modalType: "PROCEED", proceedModal: false })
      );
    }
  };
  // const submit comidity
  const onSubmitCommodity = async (e, typeSubmit) => {
    e.preventDefault();

    if (typeSubmit === "COMIDITYAGENT") {
      dispatch(
        SetpopupReducerData({
          modalType: "SUCCESSFULLY",
          successModal: true,
          type: "COMIDITYAGENT",
        })
      );
    } else {
      // navigate("/admin/application/inProcess");
      // dispatch(
      //   SetpopupReducerData({
      //     ...PopupReducer?.modal,
      //     modalType: "",
      //     showModal: false,
      //   })
      // );
     await handleProcess()
    }
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
      >
        {/* <Modal.Header onClick={() => handleClosePopup(false)}> */}
        <Modal.Title>
          <div className="exclaim">
            <img src="../../images/exclaim.png" />
          </div>
        </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body className="p-5">
          <div className="">
            {commodityModal || commodityType === "APP_PROCEED" ? (
              <>
                <h3 className="card-title">Proceed Commodity</h3>
                <p className="card-text">
                  Commodity purchase will be executed now for all the approved
                  cases.
                </p>
              </>
            ) : (
              <p className="card-text">
                Are you sure ? Proceeding with commodity sale
              </p>
            )}
          </div>
          <div
            className={`d-flex align-items-center justify-content-around buttons py-4 mb-4 ${"saveBtn"}`}
          >
            <button className="w-50 me-4" onClick={handleClosePopup}>
              No
            </button>
            {commodityModal ||
            commodityType === "APP_PROCEED" ||
            commodityType === "COMIDITYAGENT" ? (
              <button
                className="w-50 me-4"
                onClick={(e) => onSubmitCommodity(e, commodityType)}
                disabled={Loader?.data || false}
              >
                {Loader?.data ? <Spinner /> : "Confirm"}
              </button>
            ) : (
              <button
                className="w-50"
                onClick={(e) => onSubmitProceed(e, "create")}
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
