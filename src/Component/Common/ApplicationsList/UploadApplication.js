import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../store/reducer";
import ImportApplication from "../../PopupModal/ImportApplication";
import ConfirmFiles from "../CustomeUploadToFile/ConfirmFiles";
import SuccessfullyModal from "../../PopupModal/SuccessfullyModal";
import ApplicationScan from "../../PopupModal/ApplicationScan";

function UploadApplication() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false } = PopupReducer?.modal;
  const { showConfirmModal = false } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
  const { scanModal = false } = PopupReducer?.modal;

  const handleSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        modalType: "UPLOADFILE",
        showModal: true,
      })
    );
  };

  return (
    <>
      {showModal && <ImportApplication />}
      {showConfirmModal && <ConfirmFiles />}
      {successModal && <SuccessfullyModal />}
      {scanModal && <ApplicationScan />}

      <div className="card uploadCard">
        <img
          className="card-img-top"
          src="../../images/upload-image-icon-png-10.jpg"
          alt="Card image cap"
        ></img>
        <div className="card-body">
          <h3 className="card-title">Import new application</h3>
          <p className="card-text">
            Press on the purple circle to upload your first application
          </p>
          <button className="login100-form-btn" onClick={handleSubmit}>
            Upload
          </button>
          {/* <a href="#" className="btn btn-primary">Upload</a> */}
        </div>
      </div>
    </>
  );
}

export default UploadApplication;
