/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../store/reducer/index";
import RejectModal from "../../PopupModal/RejectModal";
import ReasonModal from "../../PopupModal/ReasonModal";
import ExceptionModal from "../../PopupModal/ExceptionModal";
import SuccessfullyModal from "../../PopupModal/SuccessfullyModal";
import Rules from "./Rules";
import Filter from "./Filter";
import { fetchApplicationList } from "../../../Config/FetchListingData";
import ListingWithRule from "./ListingWithRule";

function NewList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); //page
  const [perPage, setPerPage] = useState(30); //limit

  const { PopupReducer } = useSelector((state) => state);
  const {
    rejectModal = false,
    reasonModal = false,
    exceptionModal = false,
    successModal = false,
  } = PopupReducer?.modal;

  const [showRules, setShowRules] = useState(false);

  const statuses = ["active", "inactive"];

  // Function to generate a random name
  function generateRandomName() {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      createdAt: new Date(),
      _id: Math.random().toString(36).substring(2), // Generate a random id for each object
      status: randomStatus,
    };
  }

  // Function to generate an array of dynamic data for the table
  function generateDynamicDataArray(numberOfRows) {
    const dataArray = [];
    for (let i = 0; i < numberOfRows; i++) {
      dataArray.push(generateRandomName());
    }
    return dataArray;
  }

  // Generating an array of dynamic data for the table
  const numberOfRowsToGenerate = 10; // Adjust as needed
  // const unprocessedData = generateDynamicDataArray(numberOfRowsToGenerate);
  const unprocessedData = [
    {
      _id: 1,
      createdAt: new Date(),
      CRN: "1220872-00",
      status: "CONFIRM",
    },
    {
      _id: 2,
      createdAt: new Date(),
      CRN: "1220872-00",
      status: "CONFIRM",
    },
    {
      _id: 3,
      createdAt: new Date(),
      CRN: "1220872-00",
      status: "FAILED",
    },
    {
      _id: 4,
      createdAt: new Date(),
      CRN: "1220872-00",
      status: "CONFIRM",
    },
    {
      _id: 5,
      createdAt: new Date(),
      CRN: "1220872-00",
      status: "FAILED",
    },
  ];

  const columns = [
    {
      name: "S.No.",
      cell: (row) => (row?._id ? row?._id : "N/A"),
      sortable: true,
    },
    {
      name: " Date",
      selector: (row) => new Date(row?.createdAt).toLocaleDateString(),
      sortable: true,
      dataKey: "id",
    },
    {
      name: "Check CRN",
      // width: "300px",
      cell: (row) => (row?.CRN ? row?.CRN : "N/A"),
      sortable: true,
    },

    {
      name: "Rule 1",
      selector: (row) => (
        <>
          {row?.status === "CONFIRM" ? (
            <i
              className="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "green", fontSize: "18px" }}
            />
          ) : (
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              style={{ color: "red", fontSize: "18px" }}
            />
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Rule 2",
      selector: (row) => (
        <>
          {row?.status === "CONFIRM" ? (
            <i
              className="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "green", fontSize: "18px" }}
            />
          ) : (
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              style={{ color: "red", fontSize: "18px" }}
            />
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Rule 3",
      selector: (row) => (
        <>
          {row?.status === "CONFIRM" ? (
            <i
              className="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "green", fontSize: "18px" }}
            />
          ) : (
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              style={{ color: "red", fontSize: "18px" }}
            />
          )}
        </>
      ),
      sortable: true,
    },
  ];

  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("");

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    pageNo: currentPage,
    limit: perPage,
    startDate: "",
    endDate: "",
    periodFrom: "",
    rule: "",
  });
  const handleChangeCheckBox = (e, id) => {
    let arr = [...selectedApplication];
    if (e.target.checked) {
      arr.push(id);
    } else {
      arr = arr.filter((ele) => ele !== id);
    }
    setSelectedApplication(arr);
  };

  const fetchModal = (e) => {
    if (selectedApplication?.length === 0) {
      alert("Please select application to proceed.");
      return;
    }
    let value = e.target.value;
    setAction(value);
    if (value === "APPROVED") {
      const isFails =
        arrList
          ?.filter((ele) => selectedApplication?.includes(ele?._id))
          ?.some((ele1) =>
            ele1?.rules?.some((ele2) => ele2?.status === false)
          ) ?? false;
      if (isFails) {
        alert("Please select all rule passed application to proceed.");
        return;
      } else {
        dispatch(
          SetpopupReducerData({
            modalType: "PROCEED",
            showModal: true,
            selectedApplication: selectedApplication,
            status: value,
          })
        );
      }
    } else if (value === "REJECTED") {
      dispatch(
        SetpopupReducerData({
          modalType: "REJECTED",
          rejectModal: true,
          selectedApplication: selectedApplication,
          status: value,
        })
      );
    } else if (value === "PROCEED&EXCEPTION") {
      dispatch(
        SetpopupReducerData({
          modalType: "EXCEPTION",
          exceptionModal: true,
          type: "SUCCESSFULLY",
          selectedApplication: selectedApplication,
          status: value,
        })
      );
    }
  };
  const setRuleApplication = (data) => {
    let arr = [];
    if (filterKey?.rule !== "") {
      arr = data?.map((ele) => ele?._id);
    }
    setSelectedApplication(arr);
  };

  const handleChangeRule = (e) => {
    setFilterKey({
      ...filterKey,
      rule: !e.target.value ? "" : e.target.value === "true" ? true : false,
      pageNo: 1,
    });
  };
  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: "AWAITING_COMMODITY_PURCHASE",
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        setRuleApplication(data?.results);

        setArrList(data?.results);
      } else {
        setArrList([]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [filterKey]);

  useEffect(() => {
    fetchListingData();
  }, [fetchListingData]);
  console.log(selectedApplication, "list");
  return (
    <>
      {rejectModal && <RejectModal />}
      {reasonModal && <ReasonModal />}
      {exceptionModal && <ExceptionModal />}
      {successModal && <SuccessfullyModal />}

      <section className="">
        <div className="upload_new_application">
          <h3 className="ps-5">Commodity Purchase </h3>
          <div className="top_list">
            {showRules && <Rules />}
            <div className="mini my-2 p-4 border-bottom">
              {" "}
              <span className="cursar" onClick={() => setShowRules(!showRules)}>
                {" "}
                <img src="../../images/arrow-circle-down.svg"></img>{" "}
                {showRules ? "Minimize" : "Show"} Rule{" "}
              </span>
            </div>

            <div className="row p-4 ps-4">
              <div className="col-2">
                <label className="label">Rule</label>

                <select
                  className="form-select p-3"
                  name="period"
                  value={filterKey?.rule}
                  onChange={handleChangeRule}
                >
                  <option value={""}>Select</option>
                  <option value={true}>Pass</option>
                  <option value={false}>Fail</option>
                </select>
              </div>
              <div className="col-7">
                <div className="row ">
                  <Filter
                    filterKey={filterKey}
                    setFilterKey={setFilterKey}
                    hideSearch={true}
                  />
                </div>
              </div>

              <div className="col-3">
                <label className="label">&nbsp;</label>
                <select
                  className="form-select p-3"
                  onChange={fetchModal}
                  value={action}
                  name="action"
                >
                  <option value={""}>Actions</option>
                  <option value={"APPROVED"}>Approve and Proceed</option>
                  <option value={"PROCEED&EXCEPTION"}>
                    Proceed with exception
                  </option>
                  <option value={"REJECTED"}>
                    Reject & Send back for correction
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-group p-4">
            <label className="d-block label py-3 w-100">
              Search Applications
            </label>
            <button
              type="button"
              className="btn border-end-0 rounded border bg-white"
              data-mdb-ripple-init=""
            >
              <i className="fas fa-search fs-4 text-secondary"></i>
            </button>
            <input
              type="text"
              className="form-control p-2 border-start-0"
              placeholder="Search"
              name="serial_number"
              value={filterKey.serial_number}
              inputMode="numeric"
              onChange={(e) =>
                setFilterKey({
                  ...filterKey,
                  serial_number: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="">
            <ListingWithRule
              selectedApplication={selectedApplication}
              listingData={arrList}
              handleChangeCheckBox={handleChangeCheckBox}
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default NewList;
