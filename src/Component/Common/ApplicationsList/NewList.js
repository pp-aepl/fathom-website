/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData, createType } from "../../../store/reducer/index";
import ProceedModal from "../../PopupModal/ProceedModal";
import RejectModal from "../../PopupModal/RejectModal";
import ReasonModal from "../../PopupModal/ReasonModal";
import ExceptionModal from "../../PopupModal/ExceptionModal";
import SuccessfullyModal from "../../PopupModal/SuccessfullyModal";
import Rules from "./Rules";
import Filter from "./Filter";
import { fetchApplicationList } from "../../../Config/FetchListingData";
import moment from "moment";

function NewList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddMore, setShowAddMore] = useState(false);
  const [gatewayid, setGatewayid] = useState(null);
  const [gatedata, setGatedata] = useState({});
  const [currentPage, setCurrentPage] = useState(1); //page
  const [perPage, setPerPage] = useState(30); //limit
  const [totalRows, setTotalRows] = useState(0);
  const [selectedStartdate, setSelectedStartdate] = useState("");
  const [selectedEnddate, setSelectedEnddate] = useState("");
  const { PopupReducer } = useSelector((state) => state);
  const { proceedModal = false } = PopupReducer?.modal;
  const { rejectModal = false } = PopupReducer?.modal;
  const { reasonModal = false } = PopupReducer?.modal;
  const { exceptionModal = false } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
  const [showRules, setShowRules] = useState(false);

  const [transactionDetails, setTransactionDetails] = useState({});
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //for download file
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [Transactions, setTransactions] = useState([]);

  // filter
  const startDateFilter = (event) => {
    setSelectedStartdate(event);
    // fetchTransactionListing(event, "startDate");
  };
  const endDateFilter = (event) => {
    setSelectedEnddate(event);
    // fetchTransactionListing(event, "endDate");
  };

  const showModalInter = (id) => {
    setGatewayid(id);
    setShowAddMore(true);
  };

  //pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (perPage, page) => {
    setPerPage(perPage);
    setCurrentPage(page);
  };

  // transaction details
  // const handelTransaction = (row) => {
  //   dispatch(createType(fetchParams));
  //   navigate("/admin/add");
  //   setTransactionDetails(row);
  // };

  // filter functionality

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
              class="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "green", fontSize: "18px" }}
            />
          ) : (
            <i
              class="fa fa-times-circle"
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
              class="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "green", fontSize: "18px" }}
            />
          ) : (
            <i
              class="fa fa-times-circle"
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
              class="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "green", fontSize: "18px" }}
            />
          ) : (
            <i
              class="fa fa-times-circle"
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
      dispatch(
        SetpopupReducerData({
          modalType: "PROCEED",
          showModal: true,
          selectedApplication: selectedApplication,
          status: value,
        })
      );
    } else if (value === "REJECTED") {
      dispatch(
        SetpopupReducerData({ modalType: "REJECTED", rejectModal: true })
      );
    } else if (value === "PROCEED&EXCEPTION") {
      dispatch(
        SetpopupReducerData({
          modalType: "EXCEPTION",
          exceptionModal: true,
          type: "SUCCESSFULLY",
        })
      );
    }
  };

  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: "IMPORTED",
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data, "dattt");
        setArrList(data?.results);
      } else {
        setArrList([]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [ filterKey]);

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
              <div className="col-9">
                <div className="row ">
                  <Filter filterKey={filterKey} setFilterKey={setFilterKey} />
                </div>
              </div>

              <div className="col-3">
                <label className="label">&nbsp;</label>
                <select
                  class="form-select p-3"
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

          <div class="input-group p-4">
            <label className="d-block label py-3 w-100">
              Search Applications
            </label>
            <button
              type="button"
              class="btn border-end-0 rounded border bg-white"
              data-mdb-ripple-init=""
            >
              <i class="fas fa-search fs-4 text-secondary"></i>
            </button>
            <input
              type="text"
              class="form-control p-2 border-start-0"
              placeholder="Search"
            ></input>
          </div>
          <div className="">
            {/* <AccordianList/> */}

            <div className=" row my-5" id="table-contexual">
              <div className="col-12">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col"> </th>
                      <th scope="col">S.No. </th>
                      <th scope="col">Date</th>
                      <th scope="col">Application no.</th>
                      {arrList?.[0]?.rules?.map((ele, index) => (
                        <th scope="col">Rule {index + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.length > 0
                      ? arrList?.map((ele, index) => (
                          <tr key={index}>
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={ele._id}
                                  checked={selectedApplication?.includes(
                                    ele?._id
                                  )}
                                  onChange={(e) =>
                                    handleChangeCheckBox(e, ele._id)
                                  }
                                />
                              </div>
                            </td>
                            <td>{index + 1}</td>
                            <td>
                              {moment(ele?.createdAt)
                                .local()
                                .format("DD/MM/YYYY hh:mm a")}
                            </td>
                            <td>{ele?.serial_number}</td>
                            {ele?.rules?.map((item) => (
                              <>
                                <td title={item?.ruleId?.rule_name}>
                                  <img
                                    src={
                                      item?.status
                                        ? "../../images/icon2.png"
                                        : "../../images/icon1.png"
                                    }
                                  />
                                </td>
                              </>
                            ))}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default NewList;
