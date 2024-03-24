/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisbursedModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer } = useSelector((state) => state);
  const { disbursedModal = false } = PopupReducer?.modal;
  const [sendSuccessfully, setSendSuccessfully] = useState(false);

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    if (typeSubmit === "HOME") {
      handleClosePopup();
    } else {
      setSendSuccessfully(true);
    }
  };

  return (
    <Modal
      className={"publishModal"}
      show={disbursedModal}
      size="md"
      centered
      onHide={handleClosePopup}
      backdrop="static"
      keyboard={false}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body className="p-5">
        {sendSuccessfully && (
          <div className="my-5 text-center">
            <img src="../../images/success.png" style={{ height: "120px" }} />
          </div>
        )}
        <div className="">
          <h3 className="card-title1 text-center">
            {sendSuccessfully ? (
              "Successfully Sent"
            ) : (
              <>
                Customer finance has
                <br /> been disbursed
              </>
            )}
          </h3>

          <p className="card-text ">
            {" "}
            {sendSuccessfully ? "Welcome letters sent" : "Select below"}
          </p>
          {!sendSuccessfully && (
            <div>
              <p>Send the welcome letter</p>
              <div className="row">
                <div className="col-12 border p-2 m-2">
                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      Through Email
                    </label>
                  </div>
                </div>
                <div className="col-12 border p-2 m-2">
                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      Send to the vendor for printing and courier
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{ marginTop: "100px" }}
          className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
        >
          {sendSuccessfully ? (
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "HOME")}
            >
              Home
            </button>
          ) : (
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "SEND")}
            >
              Send
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DisbursedModal;
