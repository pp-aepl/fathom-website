import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  reSetPopupReducerData,
} from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../apiwrapper";
import { apiURl } from "../../../../store/actions";

function ProccedAllCasePopup() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const { selectedApplication = [], showModal = false } = PopupReducer?.modal;
  const [format, setFormate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [sendSuccessfully, setSendSuccessfully] = useState(false);

  const handleClosePopup = async () => {
    setTimeout(() => {
      dispatch(reSetPopupReducerData());
    }, 200);
  };

  const handleProcess = async () => {
    if (!format) {
      setError("Please select channel");
      return;
    }
    try {
      let payload = {
        ids: selectedApplication,
        status: "WELCOME_LETTER_ISSUED",
        channel: format,
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
      navigate("/admin/intelliscan?status=pass");
    } else {
      handleProcess();
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
        <div className="confirmation">
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-5">
            <div className="row mb-3">
              <h3 className="card-title text-center pb-0">Proceed All Case </h3>
              <p className="card-text ">
                {" "}
                {sendSuccessfully ? "Welcome letters sent" : "Select below"}
              </p>
              {!sendSuccessfully && (
                <>
                  <div className="col-4">
                    <p className="card-text1 mt-3">Send</p>
                  </div>
                  <div
                    className="col-8 pt-2 text-end"
                    style={{ backgroundColor: "aliceblue" }}
                  >
                    <span className="text-info mt-2 ">
                      {" "}
                      PDF and Excel format will be send to{" "}
                    </span>
                  </div>

                  <div className="col-12 border p-2 m-2">
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="email"
                        name="format"
                        value="email"
                        checked={format === "email"}
                        onChange={(e) => setFormate(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="email">
                        By Email
                      </label>
                    </div>
                  </div>
                  <div className="col-12 border p-2 m-2">
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="shareFolder"
                        name="format"
                        value="shareFolder"
                        checked={format === "shareFolder"}
                        onChange={(e) => setFormate(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="shareFolder">
                        To Share Folder
                      </label>
                    </div>
                  </div>
                  {error ? <span className="text-danger">{error}</span> : ""}
                </>
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
        </div>
      </Modal>
    </>
  );
}

export default ProccedAllCasePopup;
