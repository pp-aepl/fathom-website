import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import ApplicationScan from "./ApplicationScan";
function SuccessfullyModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { successModal = false } = PopupReducer?.modal;
  const { scanModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "SUCCESSFULLY", successModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(SetpopupReducerData({ modalType: "APPSCAN", scanModal: true }));
  };

  return (
    <>
      {scanModal && <ApplicationScan />}

      <Modal
        className={"publishModal"}
        show={successModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header onClick={() => handleClosePopup(false)}>
          <Modal.Title>
            <img
              src="../../images/Check_green_circle.svg.png"
              style={{ height: "100px", paddingLeft: "12rem" }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <h3>Successfully processed</h3>
            <p style={{ textAlign: "center", paddingLeft: "4rem" }}>
              Out of 100 cases 90 has been processed and 10 is pending for file
              confirmation.
            </p>
            <p style={{ textAlign: "center" }}>
              Do you want to validate right now?
            </p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button onClick={(e) => onSubmit(e, "saveForLater")}>Later</button>
            <button onClick={(e) => onSubmit(e, "create")}>Yes</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessfullyModal;
