/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import UploadApplication from "./UploadApplication";
import { fetchApplicationList } from "../../../Config/FetchListingData";
import moment from "moment";
import Filter from "./Filter";

function List({ id }) {
  const tableRef = useRef();
  const params = useParams();
  const fetchParams = params.status;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); //page
  const [perPage, setPerPage] = useState(30); //limit
  const [selectedStartdate, setSelectedStartdate] = useState("");
  const [selectedEnddate, setSelectedEnddate] = useState("");
  const [listName, setListName] = useState("");

  const [arrList, setArrList] = useState([]);

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    pageNo: currentPage,
    limit: perPage,
    startDate: "",
    endDate: "",
    periodFrom: "",
  });

  const handleFilterChange = (e) => {
    setFilterKey({ ...filterKey, [e.target.name]: e.target.value, pageNo: 1 });
  };

  const fetchListingData = useCallback(async () => {
    try {
      let checkStatus =
        fetchParams === "status"
          ? ""
          : fetchParams === "completed"
          ? "APPROVED"
          : fetchParams === "rejected"
          ? "REJECTED"
          : "";
      let payload = {
        status: checkStatus,
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data);
        setArrList(data?.results);
      } else {
        setArrList([]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [fetchParams, filterKey]);

  useEffect(() => {
    if (fetchParams) {
      if (fetchParams === "upload") {
        setArrList([]);
      } else {
        fetchListingData();
      }
    }
  }, [fetchParams, fetchListingData]);

  return (
    <>
      <section className="">
        <div className="upload_new_application">
          {/* <h5>{convertToCamelCase(fetchParams)}</h5> */}
          <h3 className="card-title1 ps-5">
            {fetchParams === "upload"
              ? "Upload New Application"
              : fetchParams === "status"
              ? "Upload New Application"
              : fetchParams === "completed"
              ? "Completed – Welcome Letter Issued"
              : fetchParams === "rejected"
              ? "Rejected - Pending Channel Correction"
              : ""}
          </h3>

          <div className="">
            <div className="row my-5" id="table-contexual">
              <div className="col-12">
                <div className="">
                  <div className="">
                    <div className="row align-items-center py-1 px-5">
                      <Filter
                        filterKey={filterKey}
                        setFilterKey={setFilterKey}
                      />
                    </div>
                  </div>
                  <div className="">
                    {fetchParams === "upload" ? (
                      <UploadApplication />
                    ) : arrList?.length > 0 ? (
                      <div className=" row my-5" id="table-contexual">
                        <div className="col-12">
                          <table className="table">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col" className="ps-4">
                                  S.No.{" "}
                                </th>
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
                                    {moment(item?.createdAt)
                                      .local()
                                      .format("DD/MM/YYYY hh:mm a")}
                                  </td>
                                  <td>{item?.serial_number}</td>
                                  <td>
                                    <span
                                      style={{
                                        color:
                                          item?.showStatus === "APPROVED" ||
                                          (fetchParams === "completed" &&
                                            fetchParams !== "rejected")
                                            ? "#29CC6A"
                                            : item?.showStatus === "Reject" ||
                                              fetchParams === "rejected"
                                            ? " #EF4444"
                                            : item?.showStatus === "Pending"
                                            ? "#EAB308"
                                            : "",
                                      }}
                                    >
                                      {item?.showStatus}
                                    </span>
                                  </td>
                                  <td>
                                    <a
                                      href={item?.reject_exception_document}
                                      target="_blank"
                                    >
                                      <button className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills">
                                        View
                                      </button>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      ""
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
