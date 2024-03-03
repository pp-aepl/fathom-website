import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import ApplicationScan from "./ApplicationScan";
import ProceedModal from "./ProceedModal";
import AgentModal from "./AgentModal";
import DisbursedModal from "./DisbursedModal";
function SuccessfullyModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { successModal = false } = PopupReducer?.modal;
  const { scanModal = false } = PopupReducer?.modal;
  const { proceedModal = false } = PopupReducer?.modal;
  const { agentModal = false } = PopupReducer?.modal;
  const { disbursedModal = false } = PopupReducer?.modal;
  const successType = PopupReducer?.modal?.type;
  console.log({ successType });
  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "SUCCESSFULLY", successModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    if (successType === "SUCCESSFULLY") {
      dispatch(
        SetpopupReducerData({
          modalType: "PROCEED",
          proceedModal: true,
          type: "APP_PROCEED",
        })
      );
    } else if (successType === "CHANNELLIST") {
      dispatch(SetpopupReducerData({ modalType: "AGENT", agentModal: true }));
    } else if (successType === "COMIDITYAGENT") {
      handleClosePopup()
      // dispatch(
      //   SetpopupReducerData({ modalType: "DISBURSED", disbursedModal: true })
      // );
    } else {
      dispatch(SetpopupReducerData({ modalType: "APPSCAN", scanModal: true }));
    }
  };

  return (
    <>
      {scanModal && <ApplicationScan />}
      {proceedModal && <ProceedModal />}
      {agentModal && <AgentModal />}
      {disbursedModal && <DisbursedModal />}

      <Modal
        className={"publishModal"}
        show={successModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header onClick={() => handleClosePopup(false)}> */}
        <Modal.Title>
          <img className="success-pic"
            src="../../images/success.png"/>
        </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body className="p-5">
          <div className="">
            {successType === "SUCCESSFULLY" ? (
              <h3 className="card-title">Application Processed</h3>
            ) : successType === "CHANNELLIST" ? (
              <h3 className="card-title">Murabaha Agreement Successfully updated</h3>
            ) : successType === "COMIDITYAGENT" ? (
              <h3 className="card-title">Commodity has been sold</h3>
            ) : (
              <h3 className="card-title">Successfully Processed</h3>
            )}
            {successType !== "CHANNELLIST" &&
              successType !== "COMIDITYAGENT" && (
                <>
                  {successType === "SUCCESSFULLY" ? (
                    <p className="card-text">
                      Your applications has passed all rules and those are added
                      to passed/completed app.
                    </p>
                  ) : (
                    <>
                      <p className="card-text">
                        Out of <strong>100</strong>  cases <strong>90 has been processed</strong> <br></br>
                         and <strong>10 is pending</strong> for file confirmation.
                      </p>
                      <p className="card-text pt-4">
                        Do you want to validate right now?
                      </p>
                    </>
                  )}
                </>
              )}
            {successType === "COMIDITYAGENT" && (
              <p style={{ textAlign: "center" }}>
                Commodity has been sold and a deposited in Client’s account with
                the bank.
              </p>
            )}
          </div>
          <div
            className={`d-flex justify-content-center buttons ${"saveBtn"}`}
          >
            {successType !== "COMIDITYAGENT" && (
              <>
                {successType === "SUCCESSFULLY" ||
                successType === "CHANNELLIST" ? (
                  <button className="btn"
                  
                    onClick={(e) => onSubmit(e, "create")}
                  >
                    Great
                  </button>
                ) : (
                  <>
                    <button className="btn w-50" onClick={(e) => onSubmit(e, "saveForLater")}>
                      Later
                    </button>
                    <button className="btn ms-4 w-50" onClick={(e) => onSubmit(e, "create")}>Yes</button>
                  </>
                )}
              </>
            )}

            {successType === "COMIDITYAGENT" && (
              <>
                <button onClick={(e) => handleClosePopup()}>
                  Proceed later
                </button>
                <button style={{width:"196px"}} onClick={(e) => onSubmit(e, "COMIDITYAGENT")}>
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
