/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import ConfirmFiles from "../Common/CustomeUploadToFile/ConfirmFiles";

function DuplicateModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showConfirmModal = false, showModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({
        modalType: "DUPLICATE_FILES",
        showModal: false,
      })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        modalType: "FILESCONFIRM",
        showConfirmModal: true,
      })
    );
  };

  return (
    <>
      {showConfirmModal && <ConfirmFiles />}
      <Modal
        className={"publishModal"}
        show={showModal}
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
            <h3 className="card-title">
              Duplicated files will not<br></br> going to be processed.
            </h3>
            <p className="card-text pb-10">Do you want to re-import again?</p>
          </div>

          <div
            className={`d-flex align-items-center border-top justify-content-around buttons pt-5  ${"saveBtn"}`}
          >
            <button className="w-50 me-4" onClick={handleClosePopup}>
              Review application
            </button>
            <button className="w-50" onClick={(e) => onSubmit(e, "create")}>
              Continue
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DuplicateModal;
