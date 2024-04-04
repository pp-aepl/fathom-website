/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetloaderData, reSetPopupReducerData } from "../../store/reducer";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function DisbursedModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer, Loader } = useSelector((state) => state);
  const { disbursedModal = false, selectedApplication = [] } =
    PopupReducer?.modal;
  const [sendSuccessfully, setSendSuccessfully] = useState(false);
  const [channel, setChannel] = useState("");

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "WELCOME_LETTER_ISSUED",
        channel: channel,
        showStatus: "Completed",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setSendSuccessfully(true);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    if (typeSubmit === "HOME") {
      handleClosePopup();
      navigate("/admin/application/completed");
    } else {
      handleProcess();
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
                      id="Email"
                      name="channel"
                      value="Email"
                      checked={channel === "Email"}
                      onChange={(e) => setChannel(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="Email">
                      Through Email
                    </label>
                  </div>
                </div>
                <div className="col-12 border p-2 m-2">
                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="Vendor"
                      name="channel"
                      value="Vendor"
                      checked={channel === "Vendor"}
                      onChange={(e) => setChannel(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="Vendor">
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
              disabled={Loader?.data || false}
            >
              {Loader?.data ? <Spinner /> : "Send"}
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DisbursedModal;
