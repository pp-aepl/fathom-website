import React from "react";
import { useSelector } from "react-redux";
import CommonResponsePopup from "./CommonPopup";
import ImportApplication from "./ImportApplication";
import DuplicateModal from "./DuplicateModal";
import ProceedModal from "./ProceedModal";
import ProceedCommodityModal from "../Common/ApplicationsList/CommodityTrade/ProceedCommodityModal";
import MurabahaModal from "../Common/ApplicationsList/MurabahaAgreement/MurabahaModal";
import ApplicationScan from "./ApplicationScan";
import CheckedApplications from "./CheckedApplications";
import MurabahaSuccessfully from "../Common/ApplicationsList/MurabahaAgreement/MurabahaSuccessfully";
import AgentModal from "./AgentModal";
import LoginValidationModal from "./LoginValidationModal";
import LogoutModal from "./LogoutModal";
import OpenDocument from "./OpenDocument";
import FileConfirmation from "../Common/IntelliScan/Popups/FileConfirmation";
import Download from "../Common/IntelliScan/Popups/Download";
import ProccedAllCasePopup from "../Common/IntelliScan/Popups/ProccedAllCasePopup";
import ExceptionModal from "./ExceptionModal";

function OpenModal() {
  const { PopupReducer } = useSelector((state) => state);
  const { modalType = "", showModal = false } = PopupReducer?.modal;

  return (
    <>
      {showModal ? (
        <>
          {modalType === "LOGIN" && <LoginValidationModal />}
          {modalType === "LOGOUT" && <LogoutModal />}
          {modalType === "COMMON" && <CommonResponsePopup />}
          {modalType === "UPLOAD_FILE" && <ImportApplication />}
          {modalType === "DUPLICATE_FILES" && <DuplicateModal />}
          {modalType === "PROCEED" && <ProceedModal />}
          {modalType === "ProceedCommodity" && <ProceedCommodityModal />}
          {modalType === "MURABAHA" && <MurabahaModal />}
          {modalType === "APP_SCAN" && <ApplicationScan />}
          {modalType === "CHECKED_APPLICATION" && <CheckedApplications />}
          {modalType === "MURABAHA_SUCCESS" && <MurabahaSuccessfully />}
          {modalType === "AGENT" && <AgentModal />}
          {modalType === "OPEN_DOC" && <OpenDocument />}
          {modalType === "INTELLI_SCAN_FILES_CONFIRM" && <FileConfirmation />}
          {modalType === "DOWNLOAD" && <Download />}
          {modalType === "PROCEED_ALL_CASE" && <ProccedAllCasePopup />}
          {modalType==="EXCEPTION"&&<ExceptionModal/>}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default OpenModal;
