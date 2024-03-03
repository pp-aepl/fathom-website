import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import ConfirmFiles from "../Common/CustomeUploadToFile/ConfirmFiles";

function DuplicateModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { duplicatedModal = false } = PopupReducer?.modal;
  const { showConfirmModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({
        modalType: "DUPLICATEFILES",
        duplicatedModal: false,
      })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({ modalType: "FILESCONFIRM", showConfirmModal: true })
    );
  };

  return (
    <>
      {showConfirmModal && <ConfirmFiles />}
      <Modal
        className={"publishModal"}
        show={duplicatedModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="p-5">
          <div className="">
            <i
              class="fa fa-exclamation-circle"
              aria-hidden="true"
              style={{
                paddingLeft: "19rem",
                fontSize: "9rem",
                color: "rgb(230 230 155)",
              }}
            ></i>
          </div>
          <div>
            <h3 style={{ textAlign: "center" }}>
              Duplicated files will not going to be processed.
            </h3>
            <p style={{ textAlign: "center" }}>
              Do you want to re-import again?
            </p>
          </div>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button style={{ width: "200px" }} onClick={handleClosePopup}>
              Review application
            </button>
            <button onClick={(e) => onSubmit(e, "create")}>Continue</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DuplicateModal;
