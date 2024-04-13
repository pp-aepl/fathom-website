/* eslint-disable no-unused-vars */
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
import { API, getAwsImageUrl } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function ExceptionModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const {
    exceptionModal = false,
    documents = [],
    selectedApplication,
    value
  } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
  const exceptionType = PopupReducer?.modal?.type;

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const [isUploaded, setIsUploaded] = useState(false);

  // update create api
  const getUrlsArray = async (arr) =>
    Promise.all(
      arr?.map(async (ele) => {
        let obj = await getAwsImageUrl(ele?.document);
        return { ...ele, document: obj?.Location, ...obj };
      })
    );

  const handleUploadFiles = async (e) => {
    try {
      if (!documents?.length) {
        alert("Please import application, Only PDF files are allowed.");
        return false;
      }
      if (selectedApplication?.length > 0 && documents?.length > 0) {
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };

  const onSubmit = async (e, typeSubmit) => {
    console.log({ typeSubmit });
    e.preventDefault();
    if (isUploaded) {
      await proceedWithException(e);
    } else {
      handleUploadFiles();
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

      let payload = {
        status: "APPROVED_WITH_EXCEPTION",
        showStatus: "Approved with exception",
        ids: selectedApplication,
        awsUrls: documents,
      };

      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        // dispatch(
        //   SetpopupReducerData({
        //     modalType: "SUCCESSFULLY",
        //     successModal: true,
        //     type: exceptionType,
        //   })
        // );
        dispatch(
          SetpopupReducerData({
            modalType: "PROCEED",
            showModal: true,
            selectedApplication: selectedApplication,
            status: value,
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
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <h3 className="card-title text-center my-2">
              {exceptionType === "CHANNELLIST"
                ? "Import Completed Murabaha Agreement "
                : "Upload Exception document"}
            </h3>
          </div>
          <div>
            <UploadToFile handleFileChange={handleFileChange} />
          </div>
          {exceptionType !== "CHANNELLIST" && (
            <>
              {documents?.length > 0 ? (
                <div>
                  <p className="pb-4">Files Uploaded</p>
                  <ConfirmFileList
                    setIsUploaded={setIsUploaded}
                    isUploaded={isUploaded}
                  />
                </div>
              ) : (
                ""
              )}
            </>
          )}

          <div
            style={{ marginTop: "100px" }}
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e)}
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
