/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ProceedModal from "./ProceedModal";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { fetchAgentData } from "../../Config/FetchListingData";
import { BASE_CONFIG } from "../../Config";

function AgentModal() {
  const dispatch = useDispatch();
  const [agentData, setAgentData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const { PopupReducer } = useSelector((state) => state);
  const {
    showModal = false,
    proceedModal = false,
    selectedApplication = [],
  } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "PROCESSING_COMMODITY_SALE",
        // pathArr?.[pathArr?.length - 1] === "sent"
        //   ? "AWAITING_AGENT_RESPONSE"
        //   : "AWAITING_WELCOME_LETTER",
        showStatus: "",
        portal_id: BASE_CONFIG?.APP_PORTAL_ID,
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setTimeout(() => {
          dispatch(
            SetpopupReducerData({
              ...PopupReducer?.modal,
              modalType: "PROCEED",
              showModal: true,
              type: "COMIDITYAGENT",
            })
          );
        }, 2000);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  // update create api
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleProcess();
  };

  const fetchDetails = useCallback(async () => {
    try {
      const data = await dispatch(fetchAgentData());
      // if (data?.status || data?.status === "true") {
      let obj = data?.results?.[0];
      console.log(obj, "obj");
      setAgentData(obj);
      // } else {
      //   setAgentData({});
      // }
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  return (
    <>
      {proceedModal && <ProceedModal />}

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
          <div className="">
            <h3 className="card-title1 text-center">Sending to Agent</h3>
            <p className="card-text text-center">
              Sending information to agent <br /> for selling commodity.
            </p>
          </div>
          <div className="mt-5 text-center">
            <img
              className="agent_avatar rounded-circle mt-5 img-fluid"
              src={agentData?.profilePic ?? "../../images/profile.jpeg"}
            />
            <h4 className="mt-3 text-center" style={{ fontWeight: "600" }}>
              {agentData?.agent_name ?? "User"}
            </h4>
            <p className="mt-2 card-text text-center">Agent</p>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
            style={{ marginTop: "100px" }}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e)}
            >
              Okay
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AgentModal;
