import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CircleChart from "../../../../Config/CircleChart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../../../Config/FetchListingData";

function ReportsDashboard() {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const navigate = useNavigate();
  const { ConfigData } = useSelector((state) => state);
  const { data = {} } = ConfigData;
  const dispatch = useDispatch();

  const [filterKey, setFilterKey] = useState({
    startDate: new Date().toISOString().split("T")[0] + "T00:00:00",
    endDate: "",
    period: "",
  });

  const chartData1 = {
    options: {
      chart: {
        height: 200,
        type: "radialBar",
      },
      series: [75],
      colors: ["#04275b"],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "20px",
            show: true,
            offsetY: 70,
            formatter: function (val) {
              return val || 100;
            },
          },
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "#85b2f5",
          type: "horizontal",
          gradientToColors: ["#357fed", "#739aff"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "butt",
      },
      labels: ["Completed"],
    },
  };
  const chartData2 = {
    options: {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Rule -Check Error Report, 2024",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  };
  const handleChangeReport = () => {
    navigate("/admin/intelliscan-reports-details");
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
        <div className="voucherFormMain">
          <h3 className=" card-title">Reports</h3>
          <div className="">
            <div className=" row pt-4">
              <div className="col-md-3 ">
                <label className="label">Date from</label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={dateFrom}
                  onChange={(date) => {
                    let event = { name: "startDate", value: date };
                    handleChangeDate(event);
                    setDateFrom(date);
                  }}
                  maxDate={new Date()}
                  className="form-control p-3"
                  isClearable={dateFrom}
                  placeholderText="Select start date"
                />
              </div>
              <div className="col-md-3 ">
                <label className="label">Date to</label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
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
              <div className="col-md-3">&nbsp;</div>
              <div className="col-md-3 px-4">
                <label className="label">Filter</label>
                <select
                  className="form-select p-3"
                  name="period"
                  // value={filterKey?.period}
                  onChange={handleChangeReport}
                >
                  <option selected value={"1"}>
                    Personal Finance- Murabaha
                  </option>
                  <option value="2">Auto Finance Verification</option>
                  <option value="3">Business Finance Verification</option>
                  <option value="4">Personal Finance Verification</option>
                  <option value="5">Asset Based Finance Verification</option>
                  <option value="6">Team Deposit Finance Verification</option>
                  <option value="7">Trade Finance Verification</option>
                  <option value="8">Murabaha Team Verification</option>
                  <option value="9">Home Finance Verification</option>
                  <option value="10">Credit Card Verification</option>
                  <option value="11">Product-wise Business Report</option>
                </select>
              </div>
            </div>

            <div className="row pt-4">
              <h5 className="card-title1">Personal Finance- Murabaha</h5>
              <div className="col-sm-12 col-md-8 my-2">
                <div className="row pt-4">
                  <div className="col-sm-6 pb-3">
                    <div
                      className="card dash_card w-100 "
                      style={{ height: "18rem" }}
                    >
                      <div className="card-body ">
                        <div className=" resend-time d-flex justify-content-between align-items-center">
                          <h5 className="card-title label pb-2 mt-2">
                            New Cases
                          </h5>
                          <div
                            className="remainingTime"
                            style={{ maxHeight: "25px" }}
                          >
                            01
                          </div>
                        </div>
                        <p
                          className=" disabled"
                          style={{
                            fontSize: "16px",
                            color: "#979da2",
                          }}
                        >
                          Total
                        </p>
                        <h3 className="card-title">
                          {data?.totalNewCases || 0}
                        </h3>
                        <button
                          className="btn btn-light border p-2 "
                          style={{
                            fontSize: "15px",
                            width: "100px",
                            borderRadius: "10px",
                            fontFamily: "Inter Tight",
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 pb-3">
                    <div
                      className="card dash_card w-100 "
                      style={{ height: "18rem" }}
                    >
                      <div className="card-body ">
                        <div className=" resend-time d-flex justify-content-between align-items-center">
                          <h5 className="card-title label pb-2 mt-2">
                            Error Cases
                          </h5>
                          <div
                            className="remainingTime"
                            style={{ maxHeight: "25px" }}
                          >
                            02
                          </div>
                        </div>
                        <p
                          className=" disabled"
                          style={{
                            fontSize: "16px",
                            color: "#979da2",
                          }}
                        >
                          Total
                        </p>
                        <h3 className="card-title">
                          {data?.awaitingCommodityPurchase || 0}
                        </h3>
                        <button
                          className="btn btn-light border p-2 "
                          style={{
                            fontSize: "15px",
                            width: "100px",
                            borderRadius: "10px",
                            fontFamily: "Inter Tight",
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 pb-3">
                    <div
                      className="card dash_card w-100 "
                      style={{ height: "18rem" }}
                    >
                      <div className="card-body ">
                        <div className=" resend-time d-flex justify-content-between align-items-center">
                          <h5 className="card-title label pb-2 mt-2">
                            Passed Cases
                          </h5>
                          <div
                            className="remainingTime"
                            style={{ maxHeight: "25px" }}
                          >
                            03
                          </div>
                        </div>
                        <p
                          className=" disabled"
                          style={{
                            fontSize: "16px",
                            color: "#979da2",
                          }}
                        >
                          Total
                        </p>
                        <h3 className="card-title">
                          {data?.totalNewCases - data?.totalAwaitingDigitalSign}
                        </h3>
                        <button
                          className="btn btn-light border p-2 "
                          style={{
                            fontSize: "15px",
                            width: "100px",
                            borderRadius: "10px",
                            fontFamily: "Inter Tight",
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 pb-3">
                    <div
                      className="card dash_card w-100 "
                      style={{ height: "18rem" }}
                    >
                      <div className="card-body ">
                        <div className=" resend-time d-flex justify-content-between align-items-center">
                          <h5 className="card-title label pb-2 mt-2">
                            Overall, Error Rate
                          </h5>
                          <div
                            className="remainingTime"
                            style={{ maxHeight: "25px" }}
                          >
                            04
                          </div>
                        </div>
                        <p
                          className=" disabled"
                          style={{
                            fontSize: "16px",
                            color: "#979da2",
                          }}
                        >
                          Total
                        </p>
                        <h3 className="card-title">
                          {data?.totalAwaitingDigitalSign || 0}
                        </h3>
                        <button
                          className="btn btn-light border p-2 "
                          style={{
                            fontSize: "15px",
                            width: "100px",
                            borderRadius: "10px",
                            fontFamily: "Inter Tight",
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 my-2">
                <div className="card pt-4 p-4 py-4 my-2 card-right">
                  <div className="card-body ">
                    <div className=" row d-flex justify-content-between align-items-center">
                      <div className="col-6">
                        <h3 className="card-title">Error Rate</h3>
                        <p
                          className=" disabled"
                          style={{
                            fontSize: "16px",
                            color: "#979da2",
                          }}
                        >
                          A total of 88 cases were checked against 12 data point
                          while 21 of them had one or more errors in them.
                        </p>
                      </div>
                      <div className="col-6">
                        <CircleChart chartData={chartData1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card pt-4 p-4 py-4 my-2 card-right">
                  <div className="card-body ">
                    <h3 className="card-title">Rule -Check Error Report</h3>
                    <div className="">
                      <CircleChart chartData={chartData2} />
                    </div>
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

export default ReportsDashboard;
