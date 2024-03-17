/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer/index";
import UploadToFile from "../Common/CustomeUploadToFile/UploadToFile";
import ConfirmFileList from "../Common/CustomeUploadToFile/ConfirmFileList";
import ConfirmFiles from "../Common/CustomeUploadToFile/ConfirmFiles";
import DuplicateModal from "./DuplicateModal";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function ImportApplication() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer, Loader, ConfigData } = useSelector((state) => state);

  const {
    showModal = false,
    documents = [],
    formId = "",
  } = PopupReducer?.modal;
  const [isUploaded, setIsUploaded] = useState(false);

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formId) {
        alert("Please select application category.");
        return;
      }
      if (!documents?.length) {
        alert("Please import application, Only PDF files are allowed.");
        return;
      }

      const fd = new FormData();
      const obj = documents?.[0];
      fd.append("file", obj?.document);
      fd.append("formId", formId);
      fd.append("showStatus", "Pending");
      dispatch(SetloaderData(true));

      const data = await API({
        url: `${apiURl.applications}`,
        method: "POST",
        body: fd,
      });

      if (data?.status || data?.status === "true") {
        const awsUrls = data?.awsUrl;
        const updatedObj = { ...obj, document: awsUrls?.[0] };
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
      // Handle errors
      console.error("Error submitting form:", error);
      // Set error state if needed
      // setApiErrors({ message: error.message });
    } finally {
      // Dispatch loader action to hide loader
      dispatch(SetloaderData(false));
    }
  };

  const onSubmitContinue = () => {
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        modalType: "DUPLICATE_FILES",
        showModal: true,
      })
    );
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

  return (
    <>
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
            <h3 className="card-title1">Import Application</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <p>Select application category</p>
            <select
              class="form-select mt-3 p-3 fs-5"
              name="formId"
              value={formId}
              onChange={(e) =>
                dispatch(
                  SetpopupReducerData({
                    ...PopupReducer?.modal,
                    formId: e.target.value,
                  })
                )
              }
            >
              <option value={""}>Select</option>
              {ConfigData?.categories?.map((ele) => (
                <option value={ele?._id}>{ele?.form_name}</option>
              ))}
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
              <UploadToFile handleFileChange={handleFileChange} />
            </div>
            <div className="buttons d-block pt-3 ">
              {/* <p className="pb-4">Files Uploaded</p> */}
              {isUploaded && (
                <div
                  className={`d-flex align-items-center justify-content-around pb-4 ${"saveBtn"}`}
                >
                  <button className="w-50 me-3">Files Uploaded</button>
                  <button className="w-50">Duplicated files</button>
                </div>
              )}

              <ConfirmFileList />
            </div>
          </div>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 `}
          >
            {/* continue for Uploaded files */}
            {isUploaded ? (
              <button
                className="login100-form-btn"
                onClick={(e) => onSubmitContinue(e)}
              >
                Continue
              </button>
            ) : (
              <button
                className="login100-form-btn"
                onClick={(e) => onSubmit(e)}
                disabled={Loader?.data || false}
              >
                {Loader?.data ? <Spinner /> : "Continue"}
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ImportApplication;
