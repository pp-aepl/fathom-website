/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchApplicationList } from "../../../Config/FetchListingData";
import moment from "moment";
import DatePicker from "react-datepicker";

function ReportList() {
  const params = useParams();
  const dispatch = useDispatch();
  const fetchParams = params?.reportList;
  console.log(fetchParams, "====>7");

  const [dummyList, setDummyList] = useState([
    {
      date: new Date(),
      app_name: "220872-00",
      customer_name: "Nolan Levin",
      mobileNo: "+1 4785 4587 451",
      status: "Error",
    },
    {
      date: new Date(),
      app_name: "220873-00",
      customer_name: "Aaeesha Mohamed ",
      mobileNo: "+1 4785 4587 451",
      status: "Pending",
    },
    {
      app_name: "220874-00",
      customer_name: "Jaydon Calzoni",
      email: "jaydon@yahoo.com",
      date: new Date(),
      mobileNo: "+1 4785 4587 451",
      status: "Pending",
    },
    {
      app_name: "220875-00",
      customer_name: "Maadhav Nazar ",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status: "Error",
    },
    {
      app_name: "220876-00",
      customer_name: "Emerson Vetrovs",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status: "Error",
    },
    {
      app_name: "220877-00",
      customer_name: "Haajar Rahman",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status: "Pending",
    },
    {
      app_name: "220878-00",
      customer_name: "Marcus Lipshutz",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status: "Pending",
    },
    {
      app_name: "220879-00",
      customer_name: "Zaire Culhane",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status: "Pending",
    },
    {
      app_name: "220880-00",
      customer_name: "Saadiq Yousuf ",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status: "Error",
    },
  ]);
  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("");

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    // pageNo: currentPage,
    // limit: perPage,
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
  const handleSelectFilter = (e) => {
    let value = e.target.value;
    let arr = [];
    setAction(value);
    if (value === "ALL") {
      arr = arrList?.map((ele) => ele._id);
    } else if (value === "EMAIL") {
      arr = arrList?.filter((ele) => !ele?.channel)?.map((e) => e?._id);
    } else if (value === "CHANNEL") {
      arr = arrList?.filter((ele) => ele?.channel)?.map((e) => e?._id);
    }
    setSelectedApplication(arr);
  };
  const handleChangePeriod = (e) => {
    const val = e.target.value;
    let date = new Date(); // Current date

    if (val === "day") {
      date.setDate(date.getDate() - 1); // Subtract 1 day
    } else if (val === "week") {
      date.setDate(date.getDate() - 7); // Subtract 7 days (1 week)
    } else if (val === "month") {
      date.setMonth(date.getMonth() - 1); // Subtract 1 month
    } else if (val === "") {
      date = "";
    }
    setFilterKey({ ...filterKey, periodFrom: date, pageNo: 1 });
  };
  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: fetchParams === "error" ? "PENDING" : "DISBURSAL",
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data, "dattt");
        setArrList(data?.results);
      } else {
        setArrList([...dummyList]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [fetchParams, filterKey]);

  useEffect(() => {
    if (fetchParams) {
      fetchListingData();
    }
  }, [fetchListingData]);
  console.log(selectedApplication, "list");
  return (
    <>
      <section className="px-3">
        <div className="upload_new_application">
          <h3 className="ps-5">
            {fetchParams === "error" ? "Pending / Error" : "Disbursal Report"}{" "}
          </h3>

          <div className="">
            <div className="row align-items-center py-1 px-5">
              <div className="col-md-3 px-4">
                <label className="">Filter</label>
                <select
                  class="form-select p-3"
                  name="period"
                  // value={filterKey?.period}
                  onChange={handleChangePeriod}
                >
                  <option value={""}>Select</option>
                  <option value="day">Last day</option>
                  <option value="week">Last week</option>
                  <option value="month">Last month</option>
                </select>
              </div>

              <div className="col-md-3">
                {fetchParams === "error" && (
                  <>
                    <span>Status filter</span>
                    <select
                      class="form-select p-3"
                      name="status"
                      value={filterKey?.status}
                      onChange={(e) => {
                        setFilterKey({
                          ...filterKey,
                          status: e.target.value,
                        });
                      }}
                    >
                      <option value={""}>All</option>
                      <option value="Pending">Pending</option>
                      <option value="Error">Error</option>
                    </select>
                  </>
                )}
              </div>

              <div className="col-3 ">
                <span>Date from</span>
                <DatePicker
                  selected={filterKey.startDate}
                  onChange={(date) => {
                    setFilterKey({
                      ...filterKey,
                      startDate: date,
                    });
                  }}
                  className="form-control p-3"
                  isClearable={filterKey.startDate}
                  placeholderText="Select start date"
                />
              </div>
              <div className="col-3 ">
                <span>Date to</span>
                <DatePicker
                  minDate={filterKey.startDate}
                  maxDate={new Date()}
                  selected={filterKey.endDate}
                  onChange={(date) => {
                    setFilterKey({
                      ...filterKey,
                      endDate: date,
                    });
                  }}
                  className="form-control p-3"
                  isClearable={filterKey.endDate}
                  placeholderText="Select end date"
                />
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
              className="form-control p-3"
              name="serial_number"
              value={filterKey.serial_number}
              inputMode="numeric"
              placeholder="Search..."
              onChange={(e) =>
                setFilterKey({
                  ...filterKey,
                  serial_number: e.target.value,
                })
              }
            />
          </div>
          <div className="">
            <div className=" row my-5" id="table-contexual">
              <div className="col-12">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No. </th>
                      <th scope="col">Import Date</th>
                      <th scope="col">Customer name</th>
                      <th scope="col">Application no.</th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">
                        {fetchParams === "error" ? "Reason" : "Action"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.map((item, index) => (
                      <tr
                        className="pointer"
                        // onClick={() => navigateToAgreement(item)}
                      >
                        <td className="ps-4">{index + 1}</td>
                        <td>
                          {moment(item?.createdAt)
                            .local()
                            .format("DD/MM/YYYY hh:mm a")}
                        </td>
                        <td>{item?.customer_name}</td>
                        <td>{item?.app_name}</td>
                        <td>{item?.mobileNo}</td>
                        {fetchParams === "error" ? (
                          <td>
                            <span
                              style={{
                                color:
                                  item?.status === "Error"
                                    ? "#EF4444"
                                    : "#EAB308",
                              }}
                            >
                              {item?.status}
                            </span>
                          </td>
                        ) : (
                          <td style={{ color: "#29CC6A" }}>Disbursed</td>
                        )}
                        <td>View</td>
                      </tr>
                    ))}
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

export default ReportList;
