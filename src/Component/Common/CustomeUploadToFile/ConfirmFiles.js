/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../store/reducer";
import DataTable from "react-data-table-component";
import SuccessfullyModal from "../../PopupModal/SuccessfullyModal";

function ConfirmFiles() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { successModal = false, documents = [] } = PopupReducer?.modal;
  const { showConfirmModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(
      SetpopupReducerData({
        modalType: "SUCCESSFULLY",
        successModal: false,
      })
    );
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({ modalType: "SUCCESSFULLY", successModal: true })
    );
  };
  const handleReImport = async (e) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        modalType: "UPLOAD_FILE",
        showModal: true,
      })
    );
  };
  const data = [
    {
      _id: "22233",
      status: "SUCCESS",
    },
    {
      _id: "22234",
      status: "FAILED",
    },
    {
      _id: "22235",
      status: "FAILED",
    },
  ];
  const handleDelete = (idx) => {
    let arr = [...documents];
    arr.splice(idx, 1);
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        documents: [...arr],
      })
    );
  };
  const columns = [
    {
      name: "",
      selector: (row, index) => (
        <>
          <img
            width={20}
            className=" d-inline-block"
            src="../../images/delete.png"
            onClick={() => handleDelete(index)}
          />
          <a
            href={typeof row?.document === "string" ? `${row?.document}` : "#"}
            target="_blank"
          >
            <img
              src="../../images/notepad.png"
              className="  notepad d-inline-block"
            />
          </a>

          {`${row?.name} - ${row && row?._id ? row?._id : ""}`}
        </>
      ),
      sortable: true,
    },
    {
      name: "Application",
      cell: (row) => (
        <>
          <div>
            {row?.status === "FAILED" ? (
              <>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </>
            ) : (
              <>
                <img src="../../images/close.png" className="close"></img>
              </>
            )}
          </div>
        </>
      ),
      sortable: true,
      dataKey: "id",
    },
    {
      name: "Promise to Purchase",
      cell: (row) => (
        <>
          <div>
            {row?.status === "FAILED" ? (
              <>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </>
            ) : (
              <>
                <img src="../../images/close.png" className="close"></img>
              </>
            )}
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Credit Limit Approval Report",
      cell: (row) => (
        <>
          <div>
            {row?.status === "FAILED" ? (
              <>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </>
            ) : (
              <>
                <img src="../../images/close.png" className="close"></img>
              </>
            )}
          </div>
        </>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      {successModal && <SuccessfullyModal />}
      <Modal
        className={"publishModal"}
        show={showConfirmModal}
        size="lg"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <div className="confirmation">
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 className="confirm_heading pb-0">Files Confirmation </h3>
              <p className="card-text">
                Please confirm your file include following
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-5">
            <DataTable columns={columns} data={documents || data} />
            {documents?.length === 0 ? (
              <p className="card-text pb-10">Do you want to re-import again?</p>
            ) : (
              ""
            )}
            <div
              className={`d-flex align-items-center justify-content-around pt-4 `}
            >
              {documents?.length === 0 ? (
                <button
                  className="login100-form-btn"
                  onClick={(e) => handleReImport(e)}
                >
                  Re-Import
                </button>
              ) : (
                <button
                  className="login100-form-btn"
                  onClick={(e) => onSubmit(e, "create")}
                >
                  Continue
                </button>
              )}
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ConfirmFiles;
