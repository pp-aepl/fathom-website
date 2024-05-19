/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../../../store/reducer";
import { API } from "../../../../apiwrapper";
import { apiURl } from "../../../../store/actions";
import { BASE_CONFIG } from "../../../../Config";

function FileConfirmation() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const { documents = [], showModal = false } = PopupReducer?.modal;
  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const onSubmitSignDocument = async () => {
    try {
      let payload = {
        awsUrls: documents,
        ids: documents?.map((ele) => ele?._id),
        status: "AWAITING_COMMODITY_PURCHASE",
        showStatus: "Pending",
        portal_id: BASE_CONFIG?.APP_PORTAL_ID,
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        dispatch(
          SetpopupReducerData({
            modalType: "SUCCESSFULLY",
            successModal: true,
            type: "SUCCESSFULLY",
          })
        );
      } else {
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  // update create api
  const onSubmit = async (e) => {
    e.preventDefault();
    const isInvalidDocument = documents.some((doc) => {
      const allTrue =
        doc.application && doc.credit_limit_approval && doc.promise_to_purchase;
      const allFalse =
        !doc.application &&
        !doc.credit_limit_approval &&
        !doc.promise_to_purchase;
      return !(allTrue || allFalse);
    });
    console.log(isInvalidDocument, "isInvalidDocument...>>");

    if (isInvalidDocument) {
      dispatch(
        SetpopupReducerData({
          ...PopupReducer?.modal,
          modalType: "CHECKED_APPLICATION",
          showModal: true,
        })
      );
      return false;
    } else {
      await onSubmitSignDocument();
      return true;
    }
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
  const handleChangeCheckbox = (e, idx) => {
    let arr = [...documents];
    let obj = arr[idx];
    const updatedObj = {
      ...obj,
      [e.target.name]: e.target.checked,
    };
    const updatedDocuments = [...documents];
    updatedDocuments[0] = updatedObj;
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        documents: updatedDocuments,
      })
    );
    console.log(obj, "ele");
  };
  const columns = [
    {
      name: "Agreement No.",
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
      cell: (row, indx) => (
        <>
          <div>
            {row?.application ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.application}
                name="application"
                checked={row?.application}
                disabled
                onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : (
              <img
                src="../../images/close.png"
                width={18}
                className="   d-inline-block"
              />
            )}
          </div>
        </>
      ),
      sortable: true,
      dataKey: "id",
    },
    {
      name: "Promise to Purchase",
      cell: (row, indx) => (
        <>
          <div>
            {row?.promise_to_purchase ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.promise_to_purchase}
                name="promise_to_purchase"
                disabled
                checked={row?.promise_to_purchase}
                onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : (
              <img
                src="../../images/close.png"
                width={18}
                className="   d-inline-block"
              />
            )}
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "CAM",
      cell: (row, indx) => (
        <>
          <div>
            {row?.credit_limit_approval ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.credit_limit_approval}
                name="credit_limit_approval"
                disabled
                checked={row?.credit_limit_approval}
                onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : (
              <img
                src="../../images/close.png"
                width={18}
                className="   d-inline-block"
              />
            )}
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Murbaha Agreement",
      cell: (row, indx) => (
        <>
          <div>
            {row?.credit_limit_approval ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.credit_limit_approval}
                name="credit_limit_approval"
                disabled
                checked={row?.credit_limit_approval}
                onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : (
              <img
                src="../../images/close.png"
                width={18}
                className="   d-inline-block"
              />
            )}
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Commodity trade",
      cell: (row, indx) => (
        <>
          <div>
            {row?.credit_limit_approval ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.credit_limit_approval}
                name="credit_limit_approval"
                disabled
                checked={row?.credit_limit_approval}
                onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : (
              <img
                src="../../images/close.png"
                width={18}
                className="   d-inline-block"
              />
            )}
          </div>
        </>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Modal
        className={"publishModal"}
        show={showModal}
        size="xl"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <div className="confirmation">
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-5">
            <div className="row mb-3">
              <div className="col-6">
                <h2 className=" pb-0">Files Confirmation </h2>
                <p className="card-text1">
                  Please confirm your file include following
                </p>
              </div>
              <div className="col-6">
                <div className="form-group has-search">
                  {/* <span className="fa fa-search form-control-feedback"></span> */}
                  <input
                    type="text"
                    className="form-control p-3"
                    name="serial_number"
                    // value={filterKey.serial_number}
                    inputMode="numeric"
                    placeholder="Search..."
                    // onChange={(e) =>
                    //   setFilterKey({
                    //     ...filterKey,
                    //     serial_number: e.target.value,
                    //   })
                    // }
                  />
                </div>
              </div>
            </div>
            <DataTable columns={columns} data={documents} />
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
                  disabled={Loader?.data || false}
                >
                  {Loader?.data ? <Spinner /> : "Continue"}
                </button>
              )}
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default FileConfirmation;
