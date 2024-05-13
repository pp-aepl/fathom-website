import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reSetPopupReducerData } from "../../../../store/reducer";

function Download() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const { documents = [], showModal = false } = PopupReducer?.modal;
  const [format, setFormate] = useState("");
  const [error, setError] = useState("");

  const handleClosePopup = async () => {
    setTimeout(() => {
      dispatch(reSetPopupReducerData());
    }, 200);
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
              <h3 className="card-title text-center pb-0">Download </h3>
              <p className="card-text">Select below</p>
              <p className="card-text1 mt-3">Choose formate</p>

              <div className="col-12 border p-2 m-2">
                <div className="form-check form-check-inline ">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="pdf"
                    name="format"
                    value="pdf"
                    checked={format === "pdf"}
                    onChange={(e) => setFormate(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="pdf">
                    PDF
                  </label>
                </div>
              </div>
              <div className="col-12 border p-2 m-2">
                <div className="form-check form-check-inline ">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="xlsx"
                    name="format"
                    value="xlsx"
                    checked={format === "xlsx"}
                    onChange={(e) => setFormate(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="xlsx">
                    xlsx
                  </label>
                </div>
              </div>
              <div className="col-12 border p-2 m-2">
                <div className="form-check form-check-inline ">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="word"
                    name="format"
                    value="word"
                    checked={format === "word"}
                    onChange={(e) => setFormate(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="word">
                    Word document
                  </label>
                </div>
              </div>
              {error ? <span className="text-danger">{error}</span> : ""}
            </div>

            <div
              style={{ marginTop: "100px" }}
              className={`d-flex align-items-center justify-content-around pt-4 `}
            >
              <button
                className="login100-form-btn"
                //   onClick={(e) => onSubmit()}
                disabled={Loader?.data || false}
              >
                {Loader?.data ? <Spinner /> : "Download"}
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default Download;
