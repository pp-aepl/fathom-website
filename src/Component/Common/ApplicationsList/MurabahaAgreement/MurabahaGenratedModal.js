import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";
import ProceedModal from "../../../PopupModal/ProceedModal";

function MurabahaGenratedModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { genratedModal = false } = PopupReducer?.modal;
  const { proceedModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "GENRATEFILES", genratedModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({ modalType: "FILESCONFIRM", showConfirmModal: true })
    );
    navigate("/admin/application/sent");
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={genratedModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="p-5">
          <div className="w-100 py-10 text-center">
            <img
              src="../../images/success.png"
            />
          </div>
          <div>
            <h3 className="card-title1 pb-10">
              Murabaha Agreements have been sent to selected channels
            </h3>
            {/* <p style={{textAlign:"center"}}>Murabaha document has been generated 
for all approved customers.</p> */}
          </div>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "create")}
            >
              Okey
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MurabahaGenratedModal;
