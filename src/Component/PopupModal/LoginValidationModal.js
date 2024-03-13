import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";

function LoginValidationModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { loginValidationModal = false } = PopupReducer?.modal;
  const messageType = PopupReducer?.modal?.type;
console.log({messageType})
  let loginAccess = localStorage.getItem('accessToken')


  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "LOGIN", loginValidationModal: false }));
  };

  const onSubmit = async (type) => {
    console.log(type, "17");
    dispatch(SetpopupReducerData({ modalType: "LOGIN", loginValidationModal: false }));
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
      >
        
        <Modal.Header className="p-5 border-0"> 
        <Modal.Title className="p-5 w-100 text-center">
          
            {loginAccess ? 
             <img className="success-pic"
             src="../../images/success.png"/> : 
             <img
             src="../../images/username_icon.png"
             
           />
        }
           
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-5 margin-bottom">
          <div className="">
           
            <div className="card-title1 text-center p-5">
            User name or <br></br> Password Invalid
           
            </div>
          </div>
          <div
            className={`d-flex align-items-center buttons justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button  
              style={{minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e, "create")}
            >
          {loginAccess ? 'Okey' : 'Try again'}   
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginValidationModal