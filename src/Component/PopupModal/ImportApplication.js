import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer/index";
import UploadToFile from "../Common/CustomeUploadToFile/UploadToFile";
import ConfirmFileList from "../Common/CustomeUploadToFile/ConfirmFileList";
import ConfirmFiles from "../Common/CustomeUploadToFile/ConfirmFiles";
function ImportApplication() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false } = PopupReducer?.modal;
  const { showConfirmModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "UPLOADFILE", showModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({ modalType: "UPLOADFILE", showModal: false })
    );
    dispatch(
      SetpopupReducerData({ modalType: "FILESCONFIRM", showConfirmModal: true })
    );
  };

  return (
    <>
      {showConfirmModal && <ConfirmFiles />}
      <Modal
        className={"publishModal modal_details"}
        show={showModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="fs-2">Import Application</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <p className="text-center">Select application category</p>
            <select
              class="form-select mt-3 p-3 fs-5 text-center"
              aria-label="Default select example"
            >
              <option selected>Personal Finance - Murabaha</option>
              <option value="1">Credit card Murabaha</option>
              <option value="2">Home Finance - ijarah</option>
              <option value="2">Auto Finance - Murabaha</option>
            </select>
            <select
              class="form-select mt-3 p-3"
              aria-label="Default select example"
            >
              <option selected>
                Import files from Branch server/folder location
              </option>
              <option value="1">
                Import file from Direct Sales server/folder
              </option>
              <option value="2">
                Import Files from Third Party server/folder
              </option>
              <option value="2">
                Import files from all locations server/folder
              </option>
            </select>
            <div>
              <UploadToFile />
            </div>
            <div className="mt-3">
              <p className="pb-4">Files Uploaded</p>
              <ConfirmFileList />
            </div>
          </div>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 `}
          >
            <button
              className="login100-form-btn"
              onClick={(e) => onSubmit(e, "create")}
            >
              Continue
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ImportApplication;
