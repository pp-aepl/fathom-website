import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetpopupReducerData } from "../../../../store/reducer";
import MurabahaGenratedModal from "./MurabahaGenratedModal";
function MurabahaModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { murabahaModal = false } = PopupReducer?.modal;
  const { genratedModal = false } = PopupReducer?.modal;

  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "MURABAHA", murabahaModal: false })
    );
  };

  // update create api
  const onSubmitProceed = async (e, typeSubmit) => {
    e.preventDefault();
    handleClosePopup();
    dispatch(SetpopupReducerData({ modalType: "GENRATED", genratedModal: true }));


  };

  return (
    <>
    {genratedModal && <MurabahaGenratedModal/>}
      <Modal
        className={"publishModal"}
        show={murabahaModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
      
        <Modal.Body className="p-3 pb-5">
          <div className="d-block text-end">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="notepad">
          <img src="../../images/murabaha_circle.png"
          />
        </div>
          <div className="">
            <h4 className="card-title1 text-center">Murabaha Agreement Generated</h4>
            <p className="card-text">
              Commodity Purchase has been completed, do you <br></br> want to Export
              Agreement for all approved customers?
            </p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around px-5 buttons pb-4 ${"saveBtn"}`}
          >
          
            <button className="w-100" onClick={(e) => onSubmitProceed(e, "create")}>
              Proceed
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MurabahaModal;
