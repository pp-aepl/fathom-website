/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Config/FetchListingData";
import DatePicker from "react-datepicker";
import Graph from "./Graph";
import moment from "moment";

function Dashboard() {
  const { ConfigData } = useSelector((state) => state);
  const { data = {} } = ConfigData;
  const dispatch = useDispatch();

  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [filterKey, setFilterKey] = useState({
    startDate: new Date().toISOString().split("T")[0] + "T00:00:00",
    endDate: "",
    period: "",
  });

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"], // game name
    datasets: [
      {
        label: "Ready to be import",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#8282FF",
        borderColor: "#8282FF",
        data: [200, 350, 290, 165, 50, 250, 300, 380, 400], // like count
      },
      {
        label: "Under Process",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FFCD82",
        borderColor: "#FFCD82",
        data: [45, 156, 70, 245, 78, 387, 178, 200, 120],
      },
      {
        label: "Completed",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#68DA92",
        borderColor: "#68DA92",
        data: [5, 26, 250, 120, 150, 187, 198, 300, 310],
      },
      {
        label: "Rejected",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FF8282",
        borderColor: "#FF8282",
        data: [15, 100, 50, 345, 98, 77, 176, 270, 400],
      },
    ],
  };
  const handleChangePeriod = (e) => {
    const val = e.target.value;
    let date = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    if (val === "day") {
      date.setDate(date.getDate() - 1);
    } else if (val === "week") {
      date.setDate(date.getDate() - 7);
    } else if (val === "month") {
      date.setMonth(date.getMonth() - 1);
      endDate = new Date();
    } else if (val === "") {
      date = "";
      endDate = "";
    }

    // Reset time part to set it to 00:00:00
    if (date) {
      date = date?.toISOString().split("T")[0] + "T00:00:00";
    }
    if (endDate) {
      endDate = endDate?.toISOString().split("T")[0] + "T23:59:59";
    }
    setFilterKey({ ...filterKey, startDate: date, endDate, period: val });
    setDateFrom(date);
    setDateTo(endDate);
  };
  const handleChangeDate = (e) => {
    let { name, value } = e;
    if (value) {
      let date =
        name === "startDate"
          ? moment(value).startOf("day").valueOf()
          : moment(value).endOf("day").valueOf();
      date = new Date(date);
      value = date;
    }
    setFilterKey({ ...filterKey, [name]: value, period: "" });
  };
  useEffect(() => {
    dispatch(getDashboardData({ ...filterKey }));
  }, [filterKey]);

  return (
    <section className="">
      <div className="main_dashboar">
        <h2 className="fs-4 fw-bold">
          {" "}
          Onboarding Performance – Murabaha Personal Finance
        </h2>
        <div className="voucherFormMain">
          <div className="">
            <div className=" row pt-4">
              <div className="col-md-3 px-4">
                <label className="label">Filter</label>
                <select
                  className="form-select p-3"
                  name="period"
                  value={filterKey?.period}
                  onChange={handleChangePeriod}
                >
                  <option value={""}>Select</option>
                  <option value="day">Last day</option>
                  <option value="week">Last week</option>
                  <option value="month">Last month</option>
                </select>
              </div>
              <div className="col-md-3">&nbsp;</div>
              <div className="col-3 ">
                <label className="label">Date from</label>
                <DatePicker
                  selected={dateFrom}
                  onChange={(date) => {
                    let event = { name: "startDate", value: date };
                    handleChangeDate(event);
                    setDateFrom(date);
                  }}
                  className="form-control p-3"
                  isClearable={dateFrom}
                  placeholderText="Select start date"
                />
              </div>
              <div className="col-3 ">
                <label className="label">Date to</label>
                <DatePicker
                  minDate={dateFrom}
                  maxDate={new Date()}
                  selected={dateTo}
                  onChange={(date) => {
                    let event = { name: "endDate", value: date };
                    handleChangeDate(event);
                    setDateTo(date);
                  }}
                  className="form-control p-3"
                  isClearable={dateTo}
                  placeholderText="Select end date"
                />
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-sm-4 pb-3">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">New Cases</h5>
                    <span className="card-title">
                      {data?.totalNewCases || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Awaiting Commodity Purchase
                    </h5>
                    <span className="card-title">
                      {" "}
                      {data?.awaitingCommodityPurchase || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Awaiting Customer Acceptance: Digital
                    </h5>
                    <span className="card-title">
                      {" "}
                      {data?.totalawaitingdigitalSign || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 pb-3">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Awaiting Customer Acceptance:Physica
                    </h5>
                    <span className="card-title">
                      {data?.totalawaitingdigitalSign || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Agent appointment and response
                    </h5>
                    <p className="card-title">{data?.totalCountAgent || 0} </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Completed – Welcome Letter issued
                    </h5>
                    <p className="card-title">{data?.totalCompleted || 0}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Rejected: Pending Channel Correction
                    </h5>
                    <p className="card-title">{data?.totalRejected || 0}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 pb-3">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">Success rate</h5>
                    <div className="d-flex align-items-center p-2">
                      <div className="progress dashboard-progess bar-wrapper w-100 ">
                        <div
                          className="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow={data?.successRatio || 0}
                          style={{
                            width: `${data?.successRatio || 0}%`,
                          }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="p-1">{`${
                        parseInt(data?.successRatio || 0)?.toFixed(3) || 0
                      }%`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 pb-3">
                <div className="card dash_card w-100">
                  <div className="card-body">
                    <h5 className="label d-block w-100 pb-2">
                      Average Portfolio Productivity
                    </h5>
                    <div className="d-flex align-items-center p-2">
                      <div className="progress dashboard-progess bar-wrapper w-100 ">
                        <div
                          className="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow={data?.successRatio}
                          style={{ width: `${data?.successRatio}%` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="p-1">25min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-sm-9">
                {/* <Line data={lineData} /> */}
                <Graph />
              </div>

              <div className="col-md-3">
                <div className="card p-4 py-4 card-right">
                  <h5 className="card-title1">Productivity Stage wise</h5>
                  <p className="label pb-0">Import to Commodity Purchase</p>
                  <div className="d-flex align-items-center p-2 border-bottom">
                    <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                      <div
                        className="progress-bar skill-bar desh_progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="p-1">25min</span>
                  </div>

                  <p className="label pb-0 mt-4">
                    Murabaha Agreement Generation to Customer Acceptance:
                    Digital
                  </p>
                  <div className="d-flex align-items-center p-2 border-bottom">
                    <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                      <div
                        className="progress-bar skill-bar desh_progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="p-1">25 min</span>
                  </div>

                  <p className="label pb-0 mt-4 w-75">
                    Murabaha Agreement Generation to Customer Acceptance:-
                    Physical
                  </p>
                  <div className="d-flex align-items-center p-2 border-bottom">
                    <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                      <div
                        className="progress-bar skill-bar desh_progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="p-1 w-50px">10 min</span>
                  </div>

                  <p className="label pb-0 mt-4 w-75">
                    Customer Acceptance to Agent response
                  </p>
                  <div className="d-flex align-items-center p-2 border-bottom">
                    <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                      <div
                        className="progress-bar skill-bar desh_progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="p-1 w-50px">5 min</span>
                  </div>

                  <p className="label pb-0 mt-4 w-75">
                    Agent response to funding and Letter issuance
                  </p>
                  <div className="d-flex align-items-center p-2">
                    <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                      <div
                        className="progress-bar skill-bar desh_progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="p-1 w-50px">5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
