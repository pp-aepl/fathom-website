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
          <div className="exclaim">
           <img src="../../images/exclaim.png"></img>
          </div>
          <div>
            <h3 className="card-title">
              Duplicated files will not<br></br> going to be processed.
            </h3>
            <p className="card-text pb-10">
              Do you want to re-import again?
            </p>
          </div>

          <div
            className={`d-flex align-items-center border-top justify-content-around buttons pt-5 ${"saveBtn"}`}
          >
            <button className="w-50 me-4" onClick={handleClosePopup}>
              Review application
            </button>
            <button className="w-50" onClick={(e) => onSubmit(e, "create")}>Continue</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DuplicateModal;
