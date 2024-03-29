import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reSetPopupReducerData } from "../../store/reducer";
import { handleLogOut } from "../../Config/CommonFunction";
import { useNavigate } from "react-router-dom";

function LogoutModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();
  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const onSubmit = async () => {
    dispatch(handleLogOut());
    navigate("/login");
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
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="text-center ">
            <h3 className="card-title">
              LOGOUT <i className="fa fa-lock"></i>
            </h3>
            <p className="card-text">Are you sure you want to log-off?</p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
            style={{ marginTop: "100px" }}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e)}
            >
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogoutModal;
