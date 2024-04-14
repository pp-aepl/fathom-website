/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Config/FetchListingData";
import DatePicker from "react-datepicker";
import moment from "moment";
import Graph from "./Graph";
function IntelliscanDashboard() {
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
    <>
      <section className="">
        <div className="main_dashboar">
          <div className="voucherFormMain">
            <h1 className="card-title">Summary of Findings</h1>
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
                      <h5 className="label d-block w-100 pb-2">
                        Cases Checked
                      </h5>
                      <span className="card-title">
                        {data?.totalNewCases || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card dash_card w-100">
                    <div className="card-body">
                      <h5 className="label d-block w-100 pb-2">Error Cases</h5>
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
                        Overall, Error Rate
                      </h5>
                      <span className="card-title">
                        {" "}
                        {data?.totalAwaitingDigitalSign || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-sm-12 col-md-9 my-2 p-2">
                  <Graph />
                </div>

                <div className="col-md-3 my-2 p-2">
                  <div className="col-sm-12 ">
                    <div className="card dash_card w-100">
                      <div className="card-body">
                        <h5 className="card-title1">Average Error Rate</h5>

                        <div className="d-flex align-items-center p-2 border-bottom">
                          <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                            <div
                              className="progress-bar skill-bar desh_progress-bar"
                              role="progressbar"
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <span className="p-1">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card p-4 py-4 card-right">
                    <h5 className="card-title1">Portfolio-wise Error Rate</h5>
                    <p className="label pb-0">Credit Card</p>
                    <div className="d-flex align-items-center p-2 border-bottom">
                      <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          className="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="p-1">100%</span>
                    </div>

                    <p className="label pb-0">Home Finance</p>

                    <div className="d-flex align-items-center p-2 border-bottom">
                      <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          className="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="93"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="p-1">93%</span>
                    </div>

                    <p className="label pb-0">Murabaha Team</p>
                    <div className="d-flex align-items-center p-2 border-bottom">
                      <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          className="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="p-1 w-50px">100%</span>
                    </div>

                    <p className="label pb-0">Trade Finance</p>
                    <div className="d-flex align-items-center p-2 border-bottom">
                      <div className="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          className="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="95"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span className="p-1 w-50px">95%</span>
                    </div>

                    <p className="label pb-0">Team Deposit</p>
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
                      <span className="p-1 w-50px">5%</span>
                    </div>

                    <p className="label pb-0">Asset Based Finance</p>
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
                      <span className="p-1 w-50px">5%</span>
                    </div>

                    <p className="label pb-0">Personal Finance</p>
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
                      <span className="p-1 w-50px">5%</span>
                    </div>

                    <p className="label pb-0">Business Finance</p>
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
                      <span className="p-1 w-50px">5%</span>
                    </div>

                    <p className="label pb-0">Auto Finance</p>
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
                      <span className="p-1 w-50px">5%</span>
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

export default IntelliscanDashboard;
