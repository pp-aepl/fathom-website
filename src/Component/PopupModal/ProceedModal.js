import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import { useNavigate } from "react-router-dom";
function ProceedModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { proceedModal = false } = PopupReducer?.modal;
 const [commodityModal, setCommodityModal] = useState(false);
  const commodityType = PopupReducer?.modal?.type;
  const navigate = useNavigate();


  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "PROCEED", proceedModal: false })
    );
  };

  // update create api
  const onSubmitProceed = async (e, typeSubmit) => {
    e.preventDefault();
    if(commodityType === 'APP_PROCEED'){
        dispatch(SetpopupReducerData({ modalType: "PROCEED", proceedModal: false ,type:'APP_PROCEED'}));
    }
    if (typeSubmit === "create") {
      setCommodityModal(true);
  
    } else {
      setCommodityModal(false);
      dispatch(
        SetpopupReducerData({ modalType: "PROCEED", proceedModal: false })
      );
    }
  };
   // const submit comidity 
   const onSubmitComidity = async (e,typeSubmit) =>{
    console.log(typeSubmit)
    navigate("/admin/application/inProcess");
   }

  return (
    <>
      <Modal
        className={"publishModal"}
        show={proceedModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header onClick={() => handleClosePopup(false)}>
          <Modal.Title>
            {(commodityModal || commodityType === 'APP_PROCEED') ? (
              <img
                src="../../images/icon2.png"
                style={{ height: "100px", paddingLeft: "18rem" }}
              />
            ) : (
              <i
                class="fa fa-exclamation-circle"
                aria-hidden="true"
                style={{
                  paddingLeft: "19rem",
                  fontSize: "9rem",
                  color: "rgb(230 230 155)",
                }}
              ></i>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="">
            {(commodityModal || commodityType === 'APP_PROCEED') ? (
              <>
                <span style={{ paddingLeft: "9rem", fontWeight: "600" }}>
                  Commodity purchase has been completed
                </span>
                <p style={{ textAlign: "center", paddingLeft: "4rem" }}>
                  Do you want to to proceed with Murabaha Agreement generation
                </p>
              </>
            ) : (
              <p style={{ textAlign: "center" }}>
                Are you sure you want to Proceed?
              </p>
            )}
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button onClick={(e) => onSubmitProceed(e, "cancel")}>No</button>
            {(commodityModal || commodityType === 'APP_PROCEED') ? 
             <button onClick={(e) => onSubmitComidity(e, "comidity")}>Yes</button> :
             <button onClick={(e) => onSubmitProceed(e, "create")}>Yes</button>
            }

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProceedModal;
