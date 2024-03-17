/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  reSetPopupReducerData,
} from "../../../../store/reducer";
import { API } from "../../../../apiwrapper";
import { apiURl } from "../../../../store/actions";
function MurabahaModal() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const { showModal = false, selectedApplication = [] } = PopupReducer?.modal;

  const [isGenerated, setIsGenerated] = useState(false);

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "AWAITING_AGENT_APPOINTMENT",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setIsGenerated(true);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  const onSubmitProceed = async (e) => {
    e.preventDefault();
    if (isGenerated) {
      handleClosePopup();
    } else {
      await handleProcess();
    }
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={showModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="p-3 pb-5">
          <div className="d-block text-end">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="notepad">
            <img
              src={
                isGenerated
                  ? "../../images/success.png"
                  : "../../images/murabaha_circle.png"
              }
            />
          </div>
          <div className="">
            <h4 className="card-title1 text-center">
              Murabaha Agreement Generated
            </h4>
            {isGenerated ? (
              <p className="card-text">
                Murabaha document has been generated for all approved customers.
              </p>
            ) : (
              <p className="card-text">
                Commodity Purchase has been completed, do you <br></br> want to
                export agreement for all approved customers?
              </p>
            )}
          </div>
          <div
            className={`d-flex align-items-center justify-content-around px-5 buttons pb-4 ${"saveBtn"}`}
          >
            <button
              className="w-100"
              onClick={(e) => onSubmitProceed(e)}
              disabled={Loader?.data || false}
            >
              {Loader?.data ? <Spinner /> : "Proceed"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MurabahaModal;
