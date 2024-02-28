import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import ReasonModal from "./ReasonModal";
function RejectModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { rejectModal = false } = PopupReducer?.modal;
  const { reasonModal = false } = PopupReducer?.modal;
  const rejectType = PopupReducer?.modal?.type;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "REJECTED", rejectModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    if (rejectType === "REASONREJECT") {
      dispatch(
        SetpopupReducerData({ modalType: "REJECTED", rejectModal: false })
      );
    } else {
      dispatch(SetpopupReducerData({ modalType: "REASON", reasonModal: true }));
    }
  };

  return (
    <>
      {reasonModal && <ReasonModal />}
      <Modal
        className={"publishModal"}
        show={rejectModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header onClick={() => handleClosePopup(false)}>
          <Modal.Title>
            <img
              src="../../images/icon1.png"
              style={{ height: "100px", paddingLeft: "19rem" }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            {rejectType === "REASONREJECT" ? (
              <>
                <p style={{ textAlign: "center", fontWeight: "600" }}>
                  Application Rejected
                </p>
                <p style={{ textAlign: "center" }}>
                  Your applications has been rejected because those could not
                  pass all rules. Upload again to rescan applications.
                </p>
              </>
            ) : (
              <p style={{ textAlign: "center" }}>
                Reject and Send back for correction
              </p>
            )}
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

export default RejectModal;
