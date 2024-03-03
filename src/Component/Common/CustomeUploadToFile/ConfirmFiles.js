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
          <img className="d-inline-block" src="../../images/delete.png"></img>

          <img className="notepad d-inline-block" src="../../images/notepad.png"></img>
          {"CRN - " + (row && row._id ? row._id : "N/A")}
        </>
      ),
      sortable: true,
    },
    {
      name: "Application",
      cell: (row) => (
        <>
          <div>
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
              <img src="../../images/close.png" className="close"></img>
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
          <div>
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
               <img src="../../images/close.png" className="close"></img>
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
          <div>
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
             <img src="../../images/close.png"  className="close"></img>
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
              <h3 className="confirm_heading pb-0">Files Confirmation </h3>
              <p className="card-text">Please confirm your file include following</p>
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
