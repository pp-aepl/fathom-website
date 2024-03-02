import React, { useState, useRef } from "react";
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

function NewList({ id }) {
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
  const { PopupReducer } = useSelector((state) => state);
  const { proceedModal = false } = PopupReducer?.modal;
  const { rejectModal = false } = PopupReducer?.modal;
  const { reasonModal = false } = PopupReducer?.modal;
  const { exceptionModal = false } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;

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

  // filter functionality
  const fetchModal = (e) =>{
    let filteValue = e.target.value
    if(filteValue === 'APPROVE'){
      dispatch(SetpopupReducerData({ modalType: "PROCEED", proceedModal: true}));

    }else if(filteValue === 'REJECTED'){
      dispatch(SetpopupReducerData({ modalType: "REJECTED", rejectModal: true }));

    }else if(filteValue === 'PROCEED&EXCEPTION'){
      dispatch(SetpopupReducerData({ modalType: "EXCEPTION", exceptionModal: true,type:'SUCCESSFULLY' }));

    }
    
  }

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

  return (
 
      <>
          {proceedModal && <ProceedModal/>}
          {rejectModal && <RejectModal/>}
          {reasonModal && <ReasonModal/>}
          {exceptionModal && <ExceptionModal/>}
          {successModal && <SuccessfullyModal/>}

        <section className="">
          
            <div className="upload_new_application">
              {/* <h5>{convertToCamelCase(fetchParams)}</h5> */}
              
              <h3 className="ps-4">Upload New Application </h3>
              <div className="top_list">
                <div className="list_row d-flex justify-content-between">
                  <div>
                    <strong>RULE 1:</strong> Check Agency agreement date, name,
                    PO Box, Emirates is filled and signed by Customer and Agent
                  </div>
                  <div className="icon">3/6</div>
                </div>
                <div className="list_row d-flex justify-content-between">
                  <div>
                    <strong>RULE 2:</strong> Check Schedule-1 Murabaha
                    Agreement- Form of Sellers Intimation dated and signed by
                    Bank
                  </div>
                  <div className="icon">3/6</div>
                </div>

                <div className="list_row d-flex justify-content-between">
                  <div>
                    <strong>RULE 3:</strong> Check Schedule-2 Form of Murabaha
                    Agreement Dated and Signed by Agent and Bank
                  </div>

                  <div className="icon">3/6</div>
                </div>
                <div className="mini my-2 p-4 border-bottom">
                  {" "}
                  <span className="cursar">
                    {" "}
                    <img src="../../images/arrow-circle-down.svg"></img>{" "}
                    Minimalize RULES{" "}
                  </span>
                </div>

                <div className="row p-4 ps-4">
                  <div className="col-md-3">
                    <label>Filter</label>
                    <div className="border rounded p-2">
                      <div class="form-check d-inline-block verticle checkbox">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="check2"
                          name="option2"
                          value="something"
                        ></input>
                      </div>
                      <select
                        class="form-select w-87 d-inline-block border-0"
                        aria-label="Default select example"
                      >
                        <option selected>Months</option>
                        <option value="1">Last day</option>
                        <option value="2">Last week</option>
                        <option value="2">Last month</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-2 ">
                    <span>Search Applictaion</span>
                    <select class="form-select p-3">
                      <option>Last week</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <span>Date from</span>
                    <div className=" p-2 text-right">
                      <input type="date" className="form-control" id="birthday" name="birthday"></input>
                    </div>
                  </div>
                  <div className="col-2">
                    <span>Date to</span>
                    <div className=" p-2 text-right">
                      <input type="date" id="birthday" className="form-control" name="birthday"></input>
                    </div>
                  </div>
                  <div className="col-3">
                    <span>&nbsp;</span>
                    <select class="form-select p-3"  onChange={fetchModal}>
                      <option value={""}>Actions</option>
                      <option value={"APPROVE"}>Approve and Proceed</option>
                      <option value={"PROCEED&EXCEPTION"}>Proceed with exception</option>
                      <option value={"REJECTED"}>Reject & Send back for correction</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="input-group p-4">
                <label className="d-block label py-3 w-100">Search Applications</label>
                <button type="button" class="btn border-end-0 rounded border bg-white" data-mdb-ripple-init="">
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
                          <th scope="col">Check CRN</th>
                          <th scope="col">Rule 1</th>
                          <th scope="col">Rule 2</th>
                          <th scope="col">Rule 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon1.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon1.png"></img>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                
                              ></input>
                            </div>
                          </td>
                          <td>1</td>
                          <td>13/05/2023</td>
                          <td>1220872-00</td>
                          <td>
                            <img src="../../images/icon1.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                          <td>
                            <img src="../../images/icon2.png"></img>
                          </td>
                        </tr>
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
