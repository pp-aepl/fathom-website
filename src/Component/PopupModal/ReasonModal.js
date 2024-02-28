import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import RejectModal from "./RejectModal";
function ReasonModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { reasonModal = false } = PopupReducer?.modal;
  const { rejectModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "REASON", reasonModal: false }));
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        modalType: "REJECTED",
        rejectModal: true,
        type: "REASONREJECT",
      })
    );
  };

  return (
    <>
      {rejectModal && <RejectModal />}

      <Modal
        className={"publishModal"}
        show={reasonModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
      
        <Modal.Body className="p-5">
          <div className="">
            <p style={{ paddingLeft: "11rem", fontWeight: "600" }}>
              Please fill the reason of rejection
            </p>
            <p>Please write your reason in the field below</p>
          </div>
          <div>
            <textarea
              className="form-control"
              placeholder="Write your reason"
              cols={60}
              rows={10}
            />
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button onClick={handleClosePopup}>Cancel</button>
            <button onClick={(e) => onSubmit(e, "create")}>Submit</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReasonModal;
