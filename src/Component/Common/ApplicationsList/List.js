import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createType } from "../../../store/reducer/index";
import UploadApplication from "./UploadApplication";

function List({ id }) {
  const tableRef = useRef();
  const params = useParams();
  const fetchParams = params.userId;
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

  const [filterKey, setFilterKey] = useState({
    search: "",
    offset: currentPage,
    limit: perPage,
    startDate: "",
    endDate: "",
  });
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
  const handelTransaction = (row) => {
    dispatch(createType(fetchParams));
    navigate("/admin/add");
    setTransactionDetails(row);
  };

  //convertToCamelCase

  const convertToCamelCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Array of dynamic first names and last names

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
  const unprocessedData = [];

  const columns = [
    {
      name: "S.No.",
      cell: (row) => (row?._id ? row?._id : "N/A"),
      sortable: true,
    },
    {
      name: "Upload Date",
      selector: (row) => new Date(row?.createdAt).toLocaleDateString(),
      sortable: true,
      dataKey: "id",
    },
    {
      name: "Number of Application",
      // width: "300px",
      cell: (row) => (row?._id ? row?._id : "N/A"),
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) =>
        row?.status ? (
          row?.status === "inactive" ? (
            <span style={{ color: "red" }} className="orderStatusa">
              {" "}
              {convertToCamelCase(row?.status)}
            </span>
          ) : row?.status === "shipped" ? (
            <span style={{ color: "#ffc107" }} className="orderStatusa">
              {" "}
              {convertToCamelCase(row?.status)}
            </span>
          ) : (
            <span
              style={{ color: "green", fontWeight: "400" }}
              className="orderStatusa"
            >
              {" "}
              {convertToCamelCase(row?.status)}
            </span>
          )
        ) : (
          "---"
        ),
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <i
            className="fas fa-edit text-primary mx-2 pointer"
            onClick={() => handelTransaction(row)}
          ></i>
        </>
      ),
      sortable: true,
    },
  ];

  return (

      <>
        <section className="">
          <div className="container">
            <div className="voucherFormMain upload_new_application">
              {/* <h5>{convertToCamelCase(fetchParams)}</h5> */}
              <h3>Upload New Application</h3> 
              <div className="top_list"> 
<div className="list_row"> 
  <strong>RULE 1:</strong>  Check Agency agreement date, name, PO Box, Emirates  is filled and signed by Customer and Agent</div>
              </div>

              
              <div className="">
                <div className="  row my-5" id="table-contexual">
                  <div className="col-12">
                    <div className="">
                      <div className="">
                        <div className="row align-items-center py-1">
                          <div className="col-md-3">
                            <span>Filter</span>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Months</option>
                              <option value="1">Last day</option>
                              <option value="2">Last week</option>
                              <option value="2">Last month</option>
                            </select>
                          </div>
                          <div className="col-3">
                            <span>Search Applictaion</span>
                            <div className="form-group has-search">
                              {/* <span className="fa fa-search form-control-feedback"></span> */}
                              <input
                                type="text"
                                className="form-control"
                                name="search"
                                value={filterKey.search}
                                placeholder="Search..."
                                onChange={(e) =>
                                  setFilterKey({
                                    ...filterKey,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-3 ">
                            <span>Date from</span>
                            <DatePicker
                              selected={selectedStartdate}
                              onChange={startDateFilter}
                              className="form-control"
                              isClearable
                              placeholderText="Select start date"
                            />
                          </div>
                          <div className="col-3 ">
                            <span>Date to</span>
                            <DatePicker
                              minDate={new Date(selectedStartdate)}
                              selected={selectedEnddate}
                              onChange={endDateFilter}
                              className="form-control"
                              isClearable
                              placeholderText="Select end date"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        {unprocessedData?.length > 0 ? (
                          <DataTable
                            columns={columns}
                            data={unprocessedData}
                            tableRef={tableRef}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                            paginationPerPage={perPage}
                            onRowClicked={handelTransaction}
                            selectableRowsHighlight
                            pointerOnHover
                          />
                        ) : (
                          <UploadApplication />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
   
  );
}

export default List;
