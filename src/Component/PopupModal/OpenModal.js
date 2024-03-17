import React from "react";
import { useSelector } from "react-redux";
import CommonResponsePopup from "./CommonPopup";
import ImportApplication from "./ImportApplication";
import DuplicateModal from "./DuplicateModal";
import ProceedModal from "./ProceedModal";
import ProceedCommodityModal from "../Common/ApplicationsList/CommodityTrade/ProceedCommodityModal";
import MurabahaModal from "../Common/ApplicationsList/MurabahaAgreement/MurabahaModal";

function OpenModal() {
  const { PopupReducer } = useSelector((state) => state);
  const { modalType = "", showModal = false } = PopupReducer?.modal;

  return (
    <>
      {showModal ? (
        <>
          {modalType === "COMMON" && <CommonResponsePopup />}
          {modalType === "UPLOAD_FILE" && <ImportApplication />}
          {modalType === "DUPLICATE_FILES" && <DuplicateModal />}
          {modalType === "PROCEED" && <ProceedModal />}
          {modalType === "ProceedCommodity" && <ProceedCommodityModal />}
          {modalType === "MURABAHA" && <MurabahaModal />}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default OpenModal;
