import React, { useState, useRef, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1); //page
  const [perPage, setPerPage] = useState(30); //limit
  const [selectedStartdate, setSelectedStartdate] = useState("");
  const [selectedEnddate, setSelectedEnddate] = useState("");
  const [listName, setListName] = useState("");

  const [arrList, setArrList] = useState([
    {
      CRN_NO: "220872-00",
      currentDate: new Date(),
      status: "Approved",
    },
    {
      CRN_NO: "220873-00",
      currentDate: new Date(),
      status: "Pending",
    },
    {
      CRN_NO: "220874-00",
      currentDate: new Date(),
      status: "Reject",
    },
    {
      CRN_NO: "220875-00",
      currentDate: new Date(),

      status: "Approved",
    },
    {
      CRN_NO: "220876-00",
      currentDate: new Date(),

      status: "Pending",
    },
    {
      CRN_NO: "220877-00",
      currentDate: new Date(),

      status: "Reject",
    },
    {
      CRN_NO: "220878-00",
      currentDate: new Date(),

      status: "Reject",
    },
    {
      CRN_NO: "220879-00",
      currentDate: new Date(),

      status: "Pending",
    },
    {
      CRN_NO: "220880-00",
      currentDate: new Date(),

      status: "Approved",
    },
    {
      CRN_NO: "220881-00",
      currentDate: new Date(),

      status: "Approved",
    },
  ]);



  const [filterKey, setFilterKey] = useState({
    search: "",
    offset: currentPage,
    limit: perPage,
    startDate: "",
    endDate: "",
  });

  // filter
  const startDateFilter = (event) => {
    setSelectedStartdate(event);
    // fetchTransactionListing(event, "startDate");
  };
  const endDateFilter = (event) => {
    setSelectedEnddate(event);
    // fetchTransactionListing(event, "endDate");
  };

  //pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (perPage, page) => {
    setPerPage(perPage);
    setCurrentPage(page);
  };



  useEffect(()=>{
   
if(fetchParams === 'upload'){
  setArrList([])
}else {}

  },[arrList])

  return (
    <>
      <section className="">
      
          <div className="upload_new_application">
            {/* <h5>{convertToCamelCase(fetchParams)}</h5> */}
            <h3 className="card-title1 ps-4">{fetchParams === 'upload' ? 'Upload New Application' :
             fetchParams === 'status' ? 'Upload New Application' :              
             fetchParams === 'completed' ? 'Completed – Welcome Letter Issued':
             fetchParams === 'rejected' ? 'Rejected - Pending Channel Correction':
             ''
             }</h3>
           

            <div className="">
              <div className="row my-5" id="table-contexual">
                <div className="col-12">
                  <div className="">
                    <div className="">
                      <div className="row align-items-center py-1 px-5">
                        <div className="col-md-3 px-4">
                          <label className="label">Filter</label>
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
                        <label className="label">Search Applictaion</label>
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
                        <label className="label">Date from</label>
                          <DatePicker
                            selected={selectedStartdate}
                            onChange={startDateFilter}
                            className="form-control"
                            isClearable
                            placeholderText="Select start date"
                          />
                        </div>
                        <div className="col-3 ">
                        <label className="label">Date to</label>
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
                      {fetchParams !== 'upload' && arrList?.length > 0 ? (
                        <div className=" row my-5" id="table-contexual">
                          <div className="col-12">
                            <table class="table">
                              <thead class="thead-light">
                                <tr>
                                  <th scope="col" className="ps-4">S.No. </th>
                                  <th scope="col">Import Date </th>
                                  <th scope="col">Application no. </th>
                                  <th scope="col">Status </th>
                                  <th scope="col">Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                {arrList?.map((item, index) => (
                                  <tr
                                    className="pointer"
                                    //  onClick={() => navigateToAgreement(item)}
                                  >
                                    <td className="ps-4">{index + 1}</td>
                                    <td>
                                      {item?.currentDate.toLocaleDateString()}
                                    </td>
                                    <td>{item?.CRN_NO}</td>
                                    <td>
                                      <span
                                        style={{
                                          color:
                                            (item?.status === "Approved" ||(fetchParams === 'completed' && fetchParams !== 'rejected'))? "#29CC6A" :
                                             (item?.status === "Reject"  || fetchParams === 'rejected') ? " #EF4444": 
                                             (item?.status === "Pending") ? "#EAB308":""
                                        }}
                                      >
                                       {
                                       fetchParams === 'completed' ? 'Approved' : 
                                       fetchParams === 'rejected' ? 'Reject' : 
                                       item?.status
                                       } 
                                      </span>
                                    </td>
                                    <td>View</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <UploadApplication />
                      )}
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
