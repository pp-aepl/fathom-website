import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetloaderData, SetpopupReducerData } from "../../store/reducer";
import RejectModal from "./RejectModal";
import { useNavigate } from "react-router-dom";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
function ReasonModal() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { reasonModal = false, selectedApplication = [] } = PopupReducer?.modal;
  const { rejectModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();
  const [reason, setReason] = useState();
  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "REASON", reasonModal: false }));
  };
  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "REJECTED",
        showStatus: "Rejected",
        rejectReason: reason,
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setTimeout(() => {
          navigate("/admin/application/list");
          dispatch(
            SetpopupReducerData({
              modalType: "REJECTED",
              rejectModal: true,
              type: "REASONREJECT",
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
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    await handleProcess();
  };

  return (
    <>
      {rejectModal && <RejectModal />}

      <Modal
        className={"publishModal"}
        show={reasonModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Body className="p-5">
          <div className="">
            <p style={{ paddingLeft: "11rem", fontWeight: "600" }}>
              Please fill the reason of rejection
            </p>
            <p>Please write your reason in the field below</p>
          </div>
          <div>
            <textarea
              className="form-control"
              placeholder="Write your reason"
              cols={60}
              rows={10}
              value={reason}
              name="reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button onClick={handleClosePopup}>Cancel</button>
            <button onClick={(e) => onSubmit(e, "create")}>Submit</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReasonModal;
