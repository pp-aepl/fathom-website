/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reSetPopupReducerData } from "../../store/reducer";

function OpenDocument() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false, docPdf = "" } = PopupReducer?.modal;
  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  return (
    <>
      <Modal
        className={"publishModal"}
        show={showModal}
        size="lg"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className="h1 card-title1">Documents</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5 pdfIframe">
          <div className="">
            {docPdf ? (
              <div className="embed-responsive embed-responsive-16by9">
                <div className="ratio ratio-16x9 text-center mt-4 mb-4">
                  <iframe
                    className="embed-responsive-item"
                    src={`${docPdf}#toolbar=0`}
                    style={{ maxWidth: "100%", height: "100%" }}
                    allowFullScreen={true}
                    title="PDF Viewer"
                  ></iframe>
                </div>
              </div>
            ) : (
              <p>No document available.</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OpenDocument;
