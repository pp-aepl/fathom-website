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
      dispatch(
        SetpopupReducerData({ modalType: "DISBURSED", disbursedModal: true })
      );
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
          <img
            src="../../images/icon2.png"
            style={{ height: "100px", paddingLeft: "19rem" }}
          />
        </Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body className="p-5">
          <div className="">
            {successType === "SUCCESSFULLY" ? (
              <h3>Application Processed</h3>
            ) : successType === "CHANNELLIST" ? (
              <h3>Murabaha Agreement Successfully uploaded</h3>
            ) : successType === "COMIDITYAGENT" ? (
              <h3>Commodity has been sold</h3>
            ) : (
              <h3>Successfully Processed</h3>
            )}
            {successType !== "CHANNELLIST" &&
              successType !== "COMIDITYAGENT" && (
                <>
                  {successType === "SUCCESSFULLY" ? (
                    <p style={{ textAlign: "center", paddingLeft: "4rem" }}>
                      Your applications has passed all rules and those are added
                      to passed/completed app.
                    </p>
                  ) : (
                    <>
                      <p style={{ textAlign: "center", paddingLeft: "4rem" }}>
                        Out of 100 cases 90 has been processed and 10 is pending
                        for file confirmation.
                      </p>
                      <p style={{ textAlign: "center" }}>
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
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            {successType !== "COMIDITYAGENT" && (
              <>
                {successType === "SUCCESSFULLY" ||
                successType === "CHANNELLIST" ? (
                  <button
                    style={{ minWidth: "-webkit-fill-available" }}
                    onClick={(e) => onSubmit(e, "create")}
                  >
                    Great
                  </button>
                ) : (
                  <>
                    <button onClick={(e) => onSubmit(e, "saveForLater")}>
                      Later
                    </button>
                    <button onClick={(e) => onSubmit(e, "create")}>Yes</button>
                  </>
                )}
              </>
            )}

            {successType === "COMIDITYAGENT" && (
              <button
                style={{ minWidth: "-webkit-fill-available" }}
                onClick={(e) => onSubmit(e, "COMIDITYAGENT")}
              >
                Okey
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessfullyModal;
