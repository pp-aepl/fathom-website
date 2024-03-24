/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";

function LoginValidationModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { loginValidationModal = false } = PopupReducer?.modal;
  const messageType = PopupReducer?.modal?.type;
  console.log({ messageType });
  let loginAccess = localStorage.getItem("accessToken");

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "LOGIN", loginValidationModal: false })
    );
  };

  const onSubmit = async (type) => {
    console.log(type, "17");
    dispatch(
      SetpopupReducerData({ modalType: "LOGIN", loginValidationModal: false })
    );
  };

  return (
    <>
      <Modal
        className={"publishModal"}
        show={loginValidationModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header>
          <Modal.Title>
            {loginAccess ? (
              <img className="success-pic" src="../../images/success.png" />
            ) : (
              <img
                src="../../images/icon1.png"
                style={{ height: "100px", paddingLeft: "19rem" }}
              />
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            <h3 style={{ textAlign: "center" }}>
              {
                messageType
                //  <span dangerouslySetInnerHTML={{ __html: 'User name or <br>Password Invalid' }} />
              }
            </h3>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "create")}
            >
              {loginAccess ? "Okey" : "Try again"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginValidationModal;
