/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reSetPopupReducerData } from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";

function MurabahaSuccessfully() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false, action = "" } = PopupReducer?.modal;
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleClosePopup();
    navigate("/admin/application/sent");
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
      >
        {" "}
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-5">
          <div className="my-5 text-center">
            <img src="../../images/success.png" style={{ height: "120px" }} />
          </div>

          <h4 className="card-title1 text-center">
            {action === "UPDATE" ? (
              <>
                Murabaha Agreement
                <br />
                Successfully updated
              </>
            ) : (
              <>
                Murabaha Agreements have
                <br />
                been sent to{" "}
                {action === "ALL" ? (
                  <>
                    all customers <br />
                    and relevant channels
                  </>
                ) : action === "CHANNEL" ? (
                  <>selected channels</>
                ) : (
                  <>the customers</>
                )}
              </>
            )}
          </h4>

          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
            style={{ marginTop: "100px" }}
          >
            {action === "UPDATE" ? (
              <button
                style={{ minWidth: "-webkit-fill-available" }}
                onClick={(e) => handleClosePopup(e)}
              >
                Great
              </button>
            ) : (
              <button
                style={{ minWidth: "-webkit-fill-available" }}
                onClick={(e) => onSubmit(e)}
              >
                Okay
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MurabahaSuccessfully;
