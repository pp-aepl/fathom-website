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
    },
    {
      _id: "22234",
    },
    {
      _id: "22235",
    },
  ];

  const columns = [
    {
      name: "Application Ref.No/Agreement No.",
      selector: (row) => (
        <>
          <i
            class="fa fa-trash "
            aria-hidden="true"
            style={{ color: "red" }}
          ></i>
          <i
            class="fa fa-file"
            aria-hidden="true"
            style={{ paddingLeft: "5px", paddingRight: "5px" }}
          ></i>
          {"CRN - " + (row && row._id ? row._id : "N/A")}
        </>
      ),
      sortable: true,
    },
    {
      name: "Application",
      cell: (row) => (
        <>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            className="form-control"
          />
        </>
      ),
      sortable: true,
      dataKey: "id",
    },
    {
      name: "Promise to Purchase",
      cell: (row) => (
        <>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            className="form-control"
          />
        </>
      ),
      sortable: true,
    },
    {
      name: "Credit Limit Approval Report",
      cell: (row) => (
        <>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            className="form-control"
          />
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
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 style={{ fontWeight: "bold", paddingLeft: "17rem" }}>
              Files Confirmation
            </h3>
            <p style={{ fontSize: "medium", paddingLeft: "17rem" }}>
              Please confirm your file include following
            </p>
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
      </Modal>
    </>
  );
}

export default ConfirmFiles;
