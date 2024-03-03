import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProceedModal from "./ProceedModal";

function AgentModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer } = useSelector((state) => state);
  const { agentModal = false } = PopupReducer?.modal;
  const { proceedModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "AGENT", agentModal: false }));
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
   navigate("/admin/application/commodity");
  dispatch(SetpopupReducerData({ modalType: "PROCEED", proceedModal: true,type:'COMIDITYAGENT'}));

};

  return (
    <>
    {proceedModal && <ProceedModal />}

      <Modal
      className={"publishModal"}
      show={agentModal}
      size="md"
      centered
      onHide={handleClosePopup}
      backdrop="static"
      keyboard={false}
    >
    
      <Modal.Body className="p-5">
        <div className="">
          <h3>Sending to Agent</h3>
          <p style={{ textAlign: "center" }}>
            Sending information to agent by selling commodity.
          </p>
        </div>
        <div>
          <img className="agent_avatar" src="../../images/agent.jpeg" />
          <h4 style={{textAlign:"center",fontWeight:"600"}}>Anbin Lukman</h4>
          <p style={{textAlign:"center"}} >Agent</p>
        </div>
        <div
          className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
        >
          <button
            style={{ minWidth: "-webkit-fill-available" }}
            onClick={(e) => onSubmit(e, "create")}
          >
            Okey
          </button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  
  );
}

export default AgentModal;
