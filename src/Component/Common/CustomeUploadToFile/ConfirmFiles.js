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
  const { successModal = false } = PopupReducer?.modal;
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

  const data = [
    {
      _id: "22233",
      status:'SUCCESS'
    },
    {
      _id: "22234",
      status:'FAILED'
    },
    {
      _id: "22235",
      status:'FAILED'
    },
  ];

  const columns = [
    {
      name: "Application Ref.No/Agreement No.",
      selector: (row) => (
        <>
          <img src="../../images/delete.png"></img>

          <img className="notepad" src="../../images/notepad.png"></img>
          {"CRN - " + (row && row._id ? row._id : "N/A")}
        </>
      ),
      sortable: true,
    },
    {
      name: "Application",
      cell: (row) => (
        <>
          <div class="form-check">
            {row?.status === 'FAILED' ? 
            <>
             <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            </> : 
            <>
               <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
          </svg>
            </>
            }
           
           
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
          <div class="form-check">
            {row?.status === 'FAILED' ? 
            <>
             <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            </> : 
            <>
               <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
          </svg>
            </>
            }
           
           
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Credit Limit Approval Report",
      cell: (row) => (
        <>
          <div class="form-check">
            {row?.status === 'FAILED' ? 
            <>
             <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            </> : 
            <>
               <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
          </svg>
            </>
            }
           
           
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
              <h3>Files Confirmation</h3>
              <p>Please confirm your file include following</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-5">
            <DataTable columns={columns} data={data} />
            <div
              className={`d-flex align-items-center justify-content-around pt-4 `}
            >
              <button
                className="login100-form-btn"
                onClick={(e) => onSubmit(e, "create")}
              >
                Continue
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ConfirmFiles;
