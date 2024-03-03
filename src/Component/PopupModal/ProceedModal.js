import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import { useNavigate } from "react-router-dom";
import SuccessfullyModal from "./SuccessfullyModal";
function ProceedModal() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { proceedModal = false } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
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
    e.preventDefault()
    if(typeSubmit === 'COMIDITYAGENT'){
      dispatch(SetpopupReducerData({ modalType: "SUCCESSFULLY", successModal: true,type:'COMIDITYAGENT' }));
    }else {
      navigate("/admin/application/inProcess");

    }
   }

  return (
    <>

      {successModal && <SuccessfullyModal />}

      <Modal
        className={"publishModal"}
        show={proceedModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header onClick={() => handleClosePopup(false)}> */}
          <Modal.Title>
          <div className="exclaim">
              <img src="../../images/exclaim.png"/></div>
          </Modal.Title>
        {/* </Modal.Header> */}
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
              <h3 className="card-title1 text-center">Are you sure you want to Proceed?</h3>
            )}
          </div>
          <div
            className={`d-flex align-items-center justify-content-around buttons py-4 mb-4 ${"saveBtn"}`}
          >
            <button className="w-50 me-4" onClick={(e) => onSubmitProceed(e, "cancel")}>No</button>
            {(commodityModal || commodityType === 'APP_PROCEED' || commodityType === 'COMIDITYAGENT') ? 
             <button className="w-50 me-4" onClick={(e) => onSubmitComidity(e, commodityType)}>Yes</button> :
             <button className="w-50" onClick={(e) => onSubmitProceed(e, "create")}>Yes</button>
            }

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProceedModal;
