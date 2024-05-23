/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import ProceedModal from "./ProceedModal";
import DisbursedModal from "./DisbursedModal";
import { useNavigate } from "react-router-dom";
import { BASE_CONFIG } from "../../Config";
import { apiURl } from "../../store/actions";
import { API } from "../../apiwrapper";
function SuccessfullyModal({isClosed}) {
  const APP_PLATFORM = BASE_CONFIG.APP_PLATFORM;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { PopupReducer } = useSelector((state) => state);
  const { successModal = false, selectedApplication = [], } = PopupReducer?.modal;
  console.log(PopupReducer)

  const { scanModal = false } = PopupReducer?.modal;
  const { proceedModal = false } = PopupReducer?.modal;
  const { disbursedModal = false } = PopupReducer?.modal;
  const successType = PopupReducer?.modal?.type;

  console.log({ successType });
  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    if (successType === "SUCCESSFULLY") {
      // dispatch(
      //   SetpopupReducerData({
      //     modalType: "PROCEED",
      //     proceedModal: true,
      //     type: "APP_PROCEED",
      //   })
      // );
      dispatch(reSetPopupReducerData());
      let nvUrl =
      APP_PLATFORM === "INTELLISCAN"
        ? "/admin/intelliscan-personal-finance-murbaha-details"
        : "/admin/application/list";
    navigate(nvUrl);
    } else if (successType === "CHANNELLIST") {
      dispatch(
        SetpopupReducerData({
          modalType: "AGENT",
          showModal: true,
        })
      );
    } else if (successType === "COMIDITYAGENT") {
      try {
        let payload = {
          ids: selectedApplication,
          showStatus: "Pending",
          status:"AWAITING_WELCOME_LETTER",
          portal_id: BASE_CONFIG?.APP_PORTAL_ID,
        };
        dispatch(SetloaderData(true));
        const data = await API({
          url: `${apiURl.applications}`,
          method: "PUT",
          body: payload,
        });
  
        if (data?.status || data?.status === "true") {
          
          handleClosePopup();
          isClosed()
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
          // if (commodityType === "COMIDITYAGENT") {
          //   let path = "/admin/application/commodity";
          //   navigate(path);
          //   dispatch(
          //     SetpopupReducerData({
          //       modalType: "SUCCESSFULLY",
          //       successModal: true,
          //       type: "COMIDITYAGENT",
          //     })
          //   );
          // } else {
          //   dispatch(
          //     SetpopupReducerData({
          //       ...PopupReducer?.modal,
          //       modalType: "",
          //       showModal: false,
          //     })
          //   );
  
          //   navigate("/admin/application/inProcess");
          // }
        } else {
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(SetloaderData(false));
      }
     
      // dispatch(
      //   SetpopupReducerData({ modalType: "DISBURSED", disbursedModal: true })
      // );
    } else {
      // dispatch(SetpopupReducerData({ modalType: "APP_SCAN", showModal: true }));
      dispatch(reSetPopupReducerData());
      navigate("/admin/application/status");
    }
  };

  return (
    <>
      {/* {scanModal && <ApplicationScan />} */}
      {proceedModal && <ProceedModal />}
      {disbursedModal && <DisbursedModal />}

      <Modal
        className={"publishModal"}
        show={successModal}
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
          <div className="my-5 text-center">
            <img src="../../../images/success.png" style={{ height: "120px" }} />
          </div>
          <div className="">
            {successType === "SUCCESSFULLY" ? (
              <h3 className="card-title">Application Processed</h3>
            ) : successType === "CHANNELLIST" ? (
              <h3 className="card-title">
                Murabaha Agreement Successfully updated
              </h3>
            ) : successType === "COMIDITYAGENT" ? (
              <h3 className="card-title">Commodity has been sold</h3>
            ) : (
              <h3 className="card-title">Successfully Processed</h3>
            )}
            {successType !== "CHANNELLIST" &&
              successType !== "COMIDITYAGENT" && (
                <>
                  {successType === "SUCCESSFULLY" ? (
                    ""
                  ) : (
                    <>
                      <p className="card-text">
                        Out of <strong>100</strong> cases <strong>90 </strong>
                        cases have been processed <br></br>
                        <strong>10 </strong> cases have not been process due to
                        one or more document missing please check the pending
                        document flow for more information
                      </p>
                      <p className="card-text pt-4">
                        Do you want to validate <strong>90 </strong> successful
                        cases?
                      </p>
                    </>
                  )}
                </>
              )}
            {successType === "COMIDITYAGENT" && (
              <p className="card-text" style={{ textAlign: "center" }}>
                Proceed with disbursal of funds
              </p>
            )}
          </div>
          <div
            className={`d-flex justify-content-center buttons ${"saveBtn"}`}
            style={{ marginTop: "100px" }}
          >
            {successType !== "COMIDITYAGENT" && (
              <>
                {successType === "SUCCESSFULLY" ||
                successType === "CHANNELLIST" ? (
                  <button
                    className="btn w-100"
                    onClick={(e) => onSubmit(e, "create")}
                  >
                    Great
                  </button>
                ) : (
                  <>
                    <button
                      className="btn w-50"
                      onClick={(e) => onSubmit(e, "saveForLater")}
                    >
                      Later
                    </button>
                    <button
                      className="btn ms-4 w-50"
                      onClick={(e) => onSubmit(e, "create")}
                    >
                      Yes
                    </button>
                  </>
                )}
              </>
            )}

            {successType === "COMIDITYAGENT" && (
              <>
                <button
                  className="w-50 me-4"
                  onClick={(e) => handleClosePopup()}
                >
                  Proceed later
                </button>
                <button
                  className="w-50 "
                  onClick={(e) => onSubmit(e, "COMIDITYAGENT")}
                >
                  Proceed with funding
                </button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessfullyModal;
