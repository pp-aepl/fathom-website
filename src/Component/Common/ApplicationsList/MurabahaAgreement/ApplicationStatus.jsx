/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import firebaseData from "../../../../Config/Firebase";
import "firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { BASE_CONFIG } from "../../../../Config";
import { apiURl } from "../../../../store/actions";
import { API } from "../../../../apiwrapper";

function ApplicationStatus() {
  const firebase = firebaseData?.firebase;
  const firebaseDb = firebaseData?.firebaseDb;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const APP_PLATFORM = BASE_CONFIG.APP_PLATFORM;
  const portal_id = BASE_CONFIG?.APP_PORTAL_ID;
  const applicationsCollectionRef = collection(firebaseDb, "applications");
  const getApplications = (appQuery) => {
    onSnapshot(appQuery, (querySnapshot) => {
      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push(doc.data());
      });
      const arr = applications?.filter((ele) => ele?.portal_id === portal_id);
      setData(arr);
    });
  };

  useEffect(() => {
    const applicationsQuery = query(
      applicationsCollectionRef,
      where("portal_id", "==", portal_id),
      where("status", "==", "AWAITING_DOCUMENT_EXTRACTION")
    );
    getApplications(applicationsQuery);
  }, []);
  const handleUpdateStatus = async (
    arr = [],
    status = "AWAITING_COMMODITY_PURCHASE"
  ) => {
    try {
      let payload = {
        ids: arr?.map((ele) => ele?._id),
        status: status || "AWAITING_COMMODITY_PURCHASE",
        showStatus: "Pending",
        portal_id: BASE_CONFIG?.APP_PORTAL_ID,
      };

      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        let nvUrl =
          APP_PLATFORM === "INTELLISCAN"
            ? "/admin/intelliscan-personal-finance-murbaha-details"
            : "/admin/application/list";
        navigate(nvUrl);
      } else {
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
    }
  };
  const handleContinue = async () => {
    const isAllYes = (doc) =>
      doc.application === "YES" &&
      doc.credit_limit_approval === "YES" &&
      doc.promise_to_purchase === "YES" &&
      (APP_PLATFORM !== "SO360"
        ? doc.murabaha_agreement === "YES" && doc.supporting_document === "YES"
        : true);

    const isAllNo = (doc) =>
      doc.application === "NO" &&
      doc.credit_limit_approval === "NO" &&
      doc.promise_to_purchase === "NO" &&
      (APP_PLATFORM !== "SO360"
        ? doc.murabaha_agreement === "NO" && doc.supporting_document === "NO"
        : true);

    const allTrue = data?.filter(isAllYes);
    const allFalse = data?.filter(isAllNo);
    if (allTrue?.length > 0)
      await handleUpdateStatus(allTrue, "AWAITING_COMMODITY_PURCHASE");
    if (allFalse?.length > 0) await handleUpdateStatus(allFalse, "REJECTED");

    console.log(allTrue, "allFalse>>", allFalse);
  };
  console.log(data, "data>>");

  const columns = [
    {
      name: "Document Name",
      selector: (row, index) => (
        <>
          <img
            width={15}
            className=" d-inline-block "
            src="../../images/delete.png"
            height={15}
            style={{ cursor: "pointer" }}
            // onClick={() => handleDelete(index)}
          />
          <a href={row?.importUrl ? `${row?.importUrl}` : "#"} target="_blank">
            <img
              src="../../images/notepad.png"
              className="  notepad d-inline-block mx-2"
              width={30}
              height={30}
            />
          </a>

          {row?.document_name ? `${row?.document_name}` : "--"}
        </>
      ),
      sortable: true,
    },
    {
      name: "Application",
      cell: (row, indx) => (
        <>
          <div>
            {row?.application === "YES" ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.application}
                name="application"
                checked={row?.application}
                disabled
                // onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : row?.application === "WAITING" ? (
              <img src="../../images/closeCircle.png" width={18} alt="" />
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
            {row?.promise_to_purchase === "YES" ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.promise_to_purchase}
                name="promise_to_purchase"
                disabled
                checked={row?.promise_to_purchase}
                // onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : row?.promise_to_purchase === "WAITING" ? (
              <img src="../../images/closeCircle.png" width={18} alt="" />
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
      name: "Credit Limit Approval Report",
      cell: (row, indx) => (
        <>
          <div>
            {row?.credit_limit_approval === "YES" ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.credit_limit_approval}
                name="credit_limit_approval"
                disabled
                checked={row?.credit_limit_approval}
                // onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : row?.credit_limit_approval === "WAITING" ? (
              <img src="../../images/closeCircle.png" width={18} alt="" />
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
    APP_PLATFORM !== "SO360" && {
      name: "Murabaha Agreement",
      cell: (row, indx) => (
        <>
          <div>
            {row?.murabaha_agreement === "YES" ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.murabaha_agreement}
                name="murabaha_agreement"
                disabled
                checked={row?.murabaha_agreement}
                // onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : row?.murabaha_agreement === "WAITING" ? (
              <img src="../../images/closeCircle.png" width={18} alt="" />
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
    APP_PLATFORM !== "SO360" && {
      name: "Supporting Document",
      cell: (row, indx) => (
        <>
          <div>
            {row?.supporting_document === "YES" ? (
              <input
                className="form-check-input"
                type="checkbox"
                value={row?.supporting_document}
                name="supporting_document"
                disabled
                checked={row?.supporting_document}
                // onChange={(e) => handleChangeCheckbox(e, indx)}
                id="flexCheckDefault"
              />
            ) : row?.supporting_document === "WAITING" ? (
              <img src="../../images/closeCircle.png" width={18} alt="" />
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
      <section className="mx-2">
        <div className="upload_new_application">
          <div className="row my-5" id="table-contexual">
            <div className="col-8">
              <h3 className="confirm_heading pb-0">Files Confirmation </h3>
              <p className="card-text1">
                Please confirm your file include following
              </p>
            </div>
            <div className="col-4">
              <div
                className={`d-flex align-items-center justify-content-around  `}
              >
                <button
                  className="login100-form-btn"
                  onClick={() => {
                    handleContinue();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>

            <div className="col-12 my-5">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ApplicationStatus;
