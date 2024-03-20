import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import UploadToFile from "../Common/CustomeUploadToFile/UploadToFile";
import SuccessfullyModal from "./SuccessfullyModal";
import ConfirmFileList from "../Common/CustomeUploadToFile/ConfirmFileList";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function ExceptionModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const {
    exceptionModal = false,
    documents = [],
    selectedApplication,
  } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
  const exceptionType = PopupReducer?.modal?.type;

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const [isUploaded, setIsUploaded] = useState(false);

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    console.log({ typeSubmit });
    e.preventDefault();
    if (isUploaded) {
      dispatch(
        SetpopupReducerData({
          modalType: "SUCCESSFULLY",
          successModal: true,
          type: typeSubmit,
        })
      );
    } else {
      await proceedWithException(e);
    }
  };
  const handleFileChange = (e) => {
    let files = e.target.files;

    let arr = Array.from(files)?.map((ele) => {
      return {
        name: ele.name,
        size: ele.size,
        type: ele.type,
        document: ele,
      };
    });
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        documents: [...documents, ...arr],
      })
    );
  };

  const proceedWithException = async (e) => {
    e.preventDefault();
    try {
      if (!documents?.length) {
        alert("Please import application, Only PDF files are allowed.");
        return;
      }

      const fd = new FormData();
      const obj = documents?.[0];
      console.log(obj);
      fd.append("file", obj?.document);
      fd.append("showStatus", "Pending");
      fd.append("newStatus", "Pending");      
      fd.append("ids", selectedApplication);
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: fd,
      });

      if (data?.status || data?.status === "true") {
        const awsUrls = data?.awsUrl;
        const newObj = data?.data?.[0];
        const updatedObj = {
          ...obj,
          document: newObj?.document || awsUrls?.[0],
          ...newObj?.newRecords,
        };
        const updatedDocuments = [...documents];
        updatedDocuments[0] = updatedObj;
        dispatch(
          SetpopupReducerData({
            ...PopupReducer?.modal,
            documents: updatedDocuments,
          })
        );

        setIsUploaded(true);
      } else {
        setIsUploaded(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };

  return (
    <>
      {successModal && <SuccessfullyModal />}

      <Modal
        className={"publishModal"}
        show={exceptionModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              {exceptionType === "CHANNELLIST"
                ? "Import Completed Murabaha Agreement "
                : "Upload Exception document"}
            </p>
          </div>
          <div>
            <UploadToFile handleFileChange={handleFileChange} />
          </div>
          {exceptionType !== "CHANNELLIST" && (
            <>
              <div>
                <p className="pb-4">Files Uploaded</p>
                {/* <div className="row">
                  <div className="col-md-1 pt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      class="bi bi-file-text"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                    </svg>
                  </div>
                  <div class="col-sm-9 pb-3">
                    <div class=" align-items-center p-1">
                      <p style={{ fontWeight: "bold" }}>
                        Approval email/Exception document
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 pt-2" style={{ color: "red" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                    </svg>
                  </div>
                </div> */}
                <ConfirmFileList setIsUploaded={setIsUploaded} />
              </div>
            </>
          )}

          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, exceptionType)}
            >
              {exceptionType === "CHANNELLIST"
                ? "Continue"
                : "Proceed with Exception"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExceptionModal;
