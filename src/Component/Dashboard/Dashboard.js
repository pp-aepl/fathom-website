import React from "react";
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";

function Dashboard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"], // game name
    datasets: [
      {
        label: "Ready to be import",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#8282FF",
        borderColor: "#8282FF",
        data: [0, 50, 90, 165, 210, 250, 300, 380, 400], // like count
      },
      {
        label: "Under Process",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FFCD82",
        borderColor: "#FFCD82",
        data: [45, 56, 70, 45, 78, 87, 178, 300, 320],
      },
      {
        label: "Completed",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#68DA92",
        borderColor: "#68DA92",
        data: [5, 46, 50, 60, 78, 87, 198, 300, 310],
      },
      {
        label: "Rejected",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#FF8282",
        borderColor: "#FF8282",
        data: [15, 76, 80, 45, 98, 77, 176, 70, 20],
      },
    ],
  };

  return (
    <section className="">
      
      <div className="main_dashboar">
        <h2 className="fs-4 fw-bold">Dashboard - Smart Onboard 360</h2>
          <div className="voucherFormMain">
          <h3 className="fs-4 fw-bold">
            Onboarding Performance – Murabaha Personal Finance
          </h3>

          <div className="">
            <div className=" row pt-4">
              <div className="col-md-3">
                <label className="fs-7 pb-4">Filter</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Last week</option>
                  <option value="1">Last day</option>
                  <option value="2">Last Month</option>
                </select>
              </div>
              <div className="col-md-3">&nbsp;</div>
              <div className="col-md-3">
              <label className="fs-7 pb-4">Date from</label>
                <input className="form-control" type="date" />
              </div>
              <div className="col-md-3">
              <label className="fs-7 pb-4">Date to</label>
                <input className="form-control" type="date" />
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="fs-5">New Cases</h5>
                    <span class="fs-1 text-dark fw-bold">7,846</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                    <h5 class="fs-5">Awaiting Commodity Purchase</h5>
                    <span class="fs-1 text-dark fw-bold">2,945</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="fs-5">
                      Awaiting Customer Acceptance: Digital
                    </h5>
                    <span class="fs-1 text-dark fw-bold">#37</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="fs-5">
                      Awaiting Customer Acceptance:Physica
                    </h5>
                    <span class="fs-1 text-dark fw-bold">7,846</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="fs-5">Agent appointment and response</h5>
                    <p class="desh_text">2,945</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="fs-5">
                      Completed – Welcome Letter issued
                    </h5>
                    <p class="desh_text">#50</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="fs-5">
                      Rejected: Pending Channel Correction
                    </h5>
                    <p class="desh_text">7,846</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                    <h5 class="desh_title">Success rate</h5>
                    <div class="d-flex align-items-center p-2">
                      <div class="progress bar-wrapper w-100 ">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="p-1">25%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                    <h5 class="desh_title">Average Portfolio Productivity</h5>
                    <div class="d-flex align-items-center p-2">
                      <div class="progress bar-wrapper w-100 ">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="p-1">25min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-sm-8">
                <div class="card">
                  <div class="card-body">
                    <div className=" row col-md-12 pt-4">
                      <div className="col-md-3">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>All Statuses</option>
                          <option value="1">Last day</option>
                          <option value="2">Last Month</option>
                        </select>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-3"></div>
                      <div className="col-md-3">
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

                      <Line data={data} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
              <div className="card p-4 dash_card">
              <h5 class="desh_title">Productivity Stage wise</h5>
                    <p>Import to Commodity Purchase</p>
                    <div class="d-flex align-items-center p-2">
                      <div class="progress bar-wrapper p-2 w-100 ">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="p-1">25min</span>
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
