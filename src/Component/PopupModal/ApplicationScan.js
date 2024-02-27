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

        <Modal.Body className="p-5">
          {statusType?.success != "SUCCESS" && (
            <div class="row d-flex justify-content-center ">
              <div class="col-md-6">
                {/* <div class="progress blue">
                   <span class="progress-left">
                     <span class="progress-bar"></span>
                   </span>
                   <span class="progress-right">
                     <span class="progress-bar"></span>
                   </span>
                   <div class="progress-value">90%</div>
                 </div> */}
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
              src="../../images/Check_green_circle.svg.png"
              style={{ height: "100px", paddingLeft: "12rem" }}
            />
          )}
          <div className="">
            <h3>
              Application scanning{" "}
              {statusType?.success === "SUCCESS" && "completed"}
            </h3>

            <p style={{ textAlign: "center" }}>
              {statusType?.success === "SUCCESS" &&
                "85 Application passed and 5 Application Failed"}
              {statusType?.success !== "SUCCESS" &&
                "Application scanning is it in process"}
            </p>
          </div>
          {statusType?.success === "SUCCESS" && (
            <div
              className={`d-flex align-items-center justify-content-around pt-4 `}
            >
              <button
                className="login100-form-btn"
                onClick={(e) => navigateToList(e, "new")}
              >
                Okey
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApplicationScan;
