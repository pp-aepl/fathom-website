/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { useNavigate } from "react-router-dom";

function CheckedApplications() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const { documents = [], showModal = false } = PopupReducer?.modal;
  const navigate = useNavigate();
  let isInvalidDocument = documents?.filter(
    (doc) =>
      !doc.application || !doc.credit_limit_approval || !doc.promise_to_purchase
  );

  const handleClosePopup = async () => {
    setTimeout(() => {
      dispatch(
        SetpopupReducerData({
          ...PopupReducer?.modal,
          modalType: "FILESCONFIRM",
          showConfirmModal: true,
        })
      );
    }, 200);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        awsUrls: documents,
        status: "IMPORTED",
        showStatus: "Pending",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "POST",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        dispatch(reSetPopupReducerData());
        navigate("/admin/application/list");
      } else {
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      dispatch(SetloaderData(false));
    }
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
        <Modal.Header onClick={() => handleClosePopup()} closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <img
            src="../../images/icon1.png"
            style={{ height: "100px", paddingLeft: "19rem" }}
            className="my-5"
          />
          <div className="row">
            <>
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Application No./CRN.No
              </p>
              <div>
                {isInvalidDocument?.length > 0
                  ? isInvalidDocument?.map((doc) => (
                      <button className="btn border">{doc?.name}</button>
                    ))
                  : ""}
              </div>
            </>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button
              style={{ minWidth: "-webkit-fill-available" }}
              onClick={(e) => onSubmit(e)}
              disabled={Loader?.data || false}
            >
              {Loader?.data ? <Spinner /> : "Okay"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CheckedApplications;
