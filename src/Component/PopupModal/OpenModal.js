import React from "react";
import { useSelector } from "react-redux";
import CommonResponsePopup from "./CommonPopup";

function OpenModal() {
  const { PopupReducer } = useSelector((state) => state);
  const { modalType = "", showModal = false } = PopupReducer?.modal;

  return (
    <>
      {showModal ? (
        <>{modalType === "COMMON" && <CommonResponsePopup />}</>
      ) : (
        ""
      )}
    </>
  );
}

export default OpenModal;
