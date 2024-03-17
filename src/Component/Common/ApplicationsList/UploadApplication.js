/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../store/reducer";
import ImportApplication from "../../PopupModal/ImportApplication";
import ConfirmFiles from "../CustomeUploadToFile/ConfirmFiles";
import SuccessfullyModal from "../../PopupModal/SuccessfullyModal";
import ApplicationScan from "../../PopupModal/ApplicationScan";
import DuplicateModal from "../../PopupModal/DuplicateModal";

function UploadApplication() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const {
    showConfirmModal = false,
    successModal = false,
    scanModal = false,
    showModal = false,
  } = PopupReducer?.modal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        modalType: "UPLOAD_FILE",
        showModal: true,
      })
    );
  };

  return (
    <>
      {showConfirmModal && <ConfirmFiles />}
      {successModal && <SuccessfullyModal />}
      {scanModal && <ApplicationScan />}

      <div className="card uploadCard">
        <img
          className="card-img-top"
          src="../../images/upload_screen1.png"
          alt="Card image cap"
          onClick={handleSubmit}
          style={{ cursor: "pointer" }}
        ></img>
        <div className="card-body">
          <h3 className="card-title fs-2 text-center">
            Import new application
          </h3>
          <p className="card-text fs-4 mb-4">
            Click on the purple circle to upload application
          </p>
          <button className="login100-form-btn" onClick={handleSubmit}>
            Import
          </button>
          {/* <a href="#" className="btn btn-primary">Upload</a> */}
        </div>
      </div>
    </>
  );
}

export default UploadApplication;
