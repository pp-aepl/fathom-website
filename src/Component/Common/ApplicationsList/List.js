import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createType } from "../../../store/reducer/index";



function List({ id }) {
  const tableRef = useRef();
  const params = useParams()
  const fetchParams = params.userId
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
  const dynamicFirstNames = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const dynamicLastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  const randomDomain = ["gmail.com", "yahoo.com", "example.com"]; // Add more domains as needed
  const statuses = ["active", "inactive"];

  // Function to generate a random phone number
  function generateRandomPhoneNumber() {
    return `+1${Math.floor(Math.random() * 10000000000)}`; // Adjust for your specific country code
  }

  // Function to generate a random name
  function generateRandomName() {
    const randomFirstName =
      dynamicFirstNames[Math.floor(Math.random() * dynamicFirstNames.length)];
    const randomLastName =
      dynamicLastNames[Math.floor(Math.random() * dynamicLastNames.length)];
    const randomDomainIndex = Math.floor(Math.random() * randomDomain.length);
    const email = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${
      randomDomain[randomDomainIndex]
    }`;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      createdAt: new Date(),
      _id: Math.random().toString(36).substring(2), // Generate a random id for each object
      first_name: randomFirstName,
      last_name: randomLastName,
      email: email,
      phoneNumber: generateRandomPhoneNumber(),
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
  const unprocessedData = generateDynamicDataArray(numberOfRowsToGenerate);

  const columns = [
    {
      name: "Date",
      selector: (row) => new Date(row?.createdAt).toLocaleDateString(),
      sortable: true,
      dataKey: "id",
    },
    {
      name: "Application Id",
      // width: "300px",
      cell: (row) => (row?._id ? row?._id : "N/A"),
      sortable: true,
    },
    {
      name: "First Name",
      cell: (row) => (row?.first_name ? row?.first_name : "N/A"),
      sortable: true,
    },
    {
      name: "Last Name",
      cell: (row) => (row?.last_name ? row?.last_name : "N/A"),
      sortable: true,
    },
    {
      name: "Email",
      width: "250px",
      cell: (row) => (row?.email ? row?.email : "N/A"),
      sortable: true,
    },
    {
      name: "Phone no",
      cell: (row) => (row?.phoneNumber ? row?.phoneNumber : "N/A"),
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
      name: "Edit",
      selector: (row) => (
        < >
          <i
            className="fas fa-edit text-primary mx-2 pointer"
            onClick={() => handelTransaction(row)}
          >
          </i>
        </>
      ),
      sortable: true,
    },
  ];

  return (
    <>
    
    
        <>
          <section className="">
            <div className="container">
              <div className="voucherFormMain" >
                <h5>{convertToCamelCase(fetchParams)}</h5>
                <div className="">
                  <div className="  row my-5" id="table-contexual">
                    <div className="col-12">
                      <div className="">
                        <div className="">
                          <div className="row align-items-center py-1">
                            <div className="col-3 ">
                              <DatePicker
                                selected={selectedStartdate}
                                onChange={startDateFilter}
                                className="form-control"
                                isClearable
                                placeholderText="Select start date"
                              />
                            </div>
                            <div className="col-3 ">
                              <DatePicker
                                minDate={new Date(selectedStartdate)}
                                selected={selectedEnddate}
                                onChange={endDateFilter}
                                className="form-control"
                                isClearable
                                placeholderText="Select end date"
                              />
                            </div>
                            <div className="col-3">
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
                          </div>
                        </div>
                        <div className="">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
     
    </>
  );
}

export default List;
