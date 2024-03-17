/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import { useNavigate } from "react-router-dom";
function ApplicationScan() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const navigate = useNavigate();
  const { PopupReducer } = useSelector((state) => state);
  const { scanModal = false } = PopupReducer?.modal;

  const [statusType, setStatusType] = useState({
    success: "",
    failed: "",
    default: "DEFAULT",
  });

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "APPSCAN", scanModal: false }));
  };

  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(SetpopupReducerData({ modalType: "APPSCAN", scanModal: true }));
    let data = { ...statusType };
    data.success = "SUCCESS";
    setStatusType(data);
    console.log(statusType);
  };
  const navigateToList = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(SetpopupReducerData({ modalType: "APPSCAN", scanModal: false }));
    navigate("/admin/application/list");
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={scanModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        {statusType?.success !== "SUCCESS" && (
          <Modal.Header closeButton onClick={onSubmit}></Modal.Header>
        )}

        <Modal.Body className="full-cover">
          {statusType?.success !== "SUCCESS" && (
            <div class="row">
              <div class="col-md-12 text-center">
             
                <div class="progressChart yellow">
                  <span class="progressChart-left">
                    <span class="progressChart-bar"></span>
                  </span>
                  <span class="progressChart-right">
                    <span class="progressChart-bar"></span>
                  </span>
                  <div class="progressChart-value">75%</div>
                </div>
              </div>
            </div>
          )}

          {statusType?.success === "SUCCESS" && (
              <img
              src="../../images/success.png"
              style={{ height: "100px", paddingLeft: "18rem" }}
            />
          
          )}
          <div className="application_san">
            <h3 className="card-title text-center">
              Application scanning {" "}
              {statusType?.success === "SUCCESS" && "completed"}
            </h3>

            <p className="card-text text-center">
              {statusType?.success === "SUCCESS" &&
                "85 Application passed and 5 Application failed"}
              {statusType?.success !== "SUCCESS" &&
                "Application scanning is in process"}
            </p>
          </div>
          {statusType?.success === "SUCCESS" && (
            <div className={`px-5 mt-4`}
            >
              <button
                className="login100-form-btn"
                onClick={(e) => navigateToList(e, "new")}
              >
                Okay
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApplicationScan;
