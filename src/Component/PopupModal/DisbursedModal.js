import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisbursedModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer } = useSelector((state) => state);
  const { disbursedModal = false } = PopupReducer?.modal;
  const [sendSuccessfully,setSendSuccessfully] = useState(false)

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({ modalType: "DISBURSED", disbursedModal: false })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    if(typeSubmit === 'HOME'){
      handleClosePopup();
    }else {
      setSendSuccessfully(true)
    }
   
   
  };

  return (
    <Modal
      className={"publishModal"}
      show={disbursedModal}
      size="md"
      centered
      onHide={handleClosePopup}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body className="p-5">
        <div className="">
        <img
            src="../../images/icon2.png"
            style={{ height: "100px", paddingLeft: "19rem" }}
          />
          <h3>{sendSuccessfully ? 'Successfully Sent' : 'Customer finance has been disbursed'}</h3>

          <p style={{ textAlign: "center" }}> {sendSuccessfully? 'Welcome letters sent' : 'Select below'}</p>
          {!sendSuccessfully && 
           <div>
           <p>Send the welcome letter</p>
           <div class="form-check form-check-inline agent_radio">
             <input
               class="form-check-input"
               type="radio"
               name="inlineRadioOptions"
               id="inlineRadio1"
               value="option1"
             />
             <label class="form-check-label" for="inlineRadio1">
               Through Email
             </label>
           </div>
           <div class="form-check form-check-inline agent_radio" >
             <input
               class="form-check-input"
               type="radio"
               name="inlineRadioOptions"
               id="inlineRadio1"
               value="option1"
             />
             <label class="form-check-label" for="inlineRadio1">
               Send to the vendor for printing and courier
             </label>
           </div>
         </div>
          }
        </div>
       

        <div
          className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
        >
          {sendSuccessfully ? 
         
          <button style={{ minWidth: "-webkit-fill-available" }} onClick={(e) => onSubmit(e, "HOME")}>
         Home
        </button>:
          <button style={{ minWidth: "-webkit-fill-available" }} onClick={(e) => onSubmit(e, "SEND")}>
          Send
        </button>
          }
         

        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DisbursedModal;
