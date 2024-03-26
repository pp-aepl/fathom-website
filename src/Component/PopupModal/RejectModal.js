/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import ReasonModal from "./ReasonModal";
import { useNavigate } from "react-router-dom";
function RejectModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const {
    rejectModal = false,
    selectedApplication,
    status,
  } = PopupReducer?.modal;
  const { reasonModal = false } = PopupReducer?.modal;
  const rejectType = PopupReducer?.modal?.type;
  const navigate = useNavigate();
  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "REJECTED", rejectModal: false })
    );
  };

  // update create api
  const onSubmit = async (e) => {
    e.preventDefault();
    if (rejectType === "REASONREJECT") {
      navigate("/admin/application/rejected");
      dispatch(
        SetpopupReducerData({ modalType: "REJECTED", rejectModal: false })
      );
    } else {
      dispatch(
        SetpopupReducerData({
          modalType: "REASON",
          reasonModal: true,
          rejectModal: false,
          selectedApplication: selectedApplication,
          status: status,
        })
      );
    }
  };

  return (
    <>
      {reasonModal && <ReasonModal />}
      <Modal
        className={"publishModal"}
        show={rejectModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header onClick={() => handleClosePopup(false)} closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <div>
              <img
                src="../../images/icon1.png"
                style={{ height: "100px", paddingLeft: "19rem" }}
              />
            </div>
            {rejectType === "REASONREJECT" ? (
              <>
                <p style={{ textAlign: "center", fontWeight: "600" }}>
                  Application Rejected
                </p>
                <p style={{ textAlign: "center" }}>
                  Your applications has been rejected because those could not
                  pass all rules. Upload again to re-scan applications.
                </p>
              </>
            ) : (
              <p style={{ textAlign: "center" }}>
                Reject and Send back for correction
              </p>
            )}
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "create")}
            >
              Okay
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RejectModal;
