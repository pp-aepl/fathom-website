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
import { API, getAwsImageUrl } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function ImportApplication() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader, ConfigData } = useSelector((state) => state);

  const {
    showModal = false,
    documents = [],
    formId = "",
  } = PopupReducer?.modal;
  const [isUploaded, setIsUploaded] = useState(false);

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
    dispatch(SetloaderData(false));
  };
  const getUrlsArray = async (arr) =>
    Promise.all(
      arr?.map(async (ele) => {
        let obj = await getAwsImageUrl(ele?.document);
        return { ...ele, document: obj?.Location, ...obj };
      })
    );

  const handleUploadFiles = async (e) => {
    try {
      if (!formId) {
        alert("Please select application category.");
        return;
      }
      if (!documents?.length) {
        alert("Please import application, Only PDF files are allowed.");
        return;
      }

      dispatch(SetloaderData(true));
      let awsUrls = await getUrlsArray(documents);
      console.log(awsUrls, "awsUrls");
      dispatch(
        SetpopupReducerData({
          ...PopupReducer?.modal,
          documents: awsUrls,
        })
      );
      setIsUploaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(true));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        formId: formId,
        showStatus: "Pending",
        awsUrls: documents,
        status: "IMPORTED",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "POST",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        let arr = data?.data?.map((ele) => {
          return { ...ele?.awsUrl, ...ele?.document };
        });
        dispatch(
          SetpopupReducerData({
            ...PopupReducer?.modal,
            documents: arr,
            modalType: "APP_SCAN",
            showModal: true,
          })
        );
      } else {
        setIsUploaded(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };

  const onSubmitContinue = () => {
    // dispatch(
    //   SetpopupReducerData({
    //     ...PopupReducer?.modal,
    //     modalType: "DUPLICATE_FILES",
    //     showModal: true,
    //   })
    // );

    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        modalType: "APP_SCAN",
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
        style={{ backdropFilter: "blur(5px)" }}
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
              className="form-select mt-3 p-3 fs-5"
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
              className="form-select mt-3 p-3"
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
                  {/* <button className="w-50">Duplicated files</button> */}
                </div>
              )}

              <ConfirmFileList setIsUploaded={setIsUploaded} />
            </div>
          </div>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 `}
          >
            {/* continue for Uploaded files */}
            {isUploaded ? (
              <button
                className="login100-form-btn"
                onClick={(e) => onSubmit(e)}
              >
                Continue
              </button>
            ) : (
              <button
                className="login100-form-btn"
                onClick={(e) => handleUploadFiles(e)}
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
