import React from "react";
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";
import CommonHeader from "../Sidebar/Nabvar/CommonHeader";

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
      <CommonHeader></CommonHeader>
      <div className="main_dashboar">
       
          <div className="voucherFormMain">
         
          <h2 className="card-title1 ps-0"> Onboarding Performance – Murabaha Personal Finance</h2>
          <div className="">
            <div className=" row pt-4">
              <div className="col-md-3">
                <label className="label pb-4">Filter</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Last week</option>
                  <option value="1">Last day</option>
                  <option value="2">Last Month</option>
                </select>
              </div>
              <div className="col-md-3">&nbsp;</div>
              <div className="col-md-3">
              <label className="label pb-4">Date from</label>
                <input className="form-control" type="date" />
              </div>
              <div className="col-md-3">
              <label className="label pb-4">Date to</label>
                <input className="form-control" type="date" />
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                    New Cases</h5>
                    <span class="card-title">7,846</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                      Awaiting Commodity Purchase</h5>
                    <span class="card-title">2,945</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                      Awaiting Customer Acceptance: Digital
                    </h5>
                    <span class="card-title">#37</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                      Awaiting Customer Acceptance:Physica
                    </h5>
                    <span class="card-title">7,846</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                    Agent appointment and response</h5>
                    <p class="card-title">2,945</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                      Completed – Welcome Letter issued
                    </h5>
                    <p class="card-title">#50</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card dash_card w-100">
                  <div class="card-body">
                  <h5 class="label d-block w-100 pb-2">
                      Rejected: Pending Channel Correction
                    </h5>
                    <p class="card-title">7,846</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                    <h5 class="label d-block w-100 pb-2">Success rate</h5>
                    <div class="d-flex align-items-center p-2">
                      <div class="progress dashboard-progess bar-wrapper w-100 ">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">25%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 pb-3">
                <div class="card dash_card w-100">
                  <div class="card-body">
                    <h5 class="label d-block w-100 pb-2">Average Portfolio Productivity</h5>
                    <div class="d-flex align-items-center p-2">
                      <div class="progress dashboard-progess bar-wrapper w-100 ">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">25min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-4">
              <div class="col-sm-9">
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

              <div className="col-md-3">
              <div className="card p-4 py-4 card-right">
              <h5 class="card-title1">Productivity Stage wise</h5>
                    <p className="label pb-0">Import to Commodity Purchase</p>
                    <div class="d-flex align-items-center p-2 border-bottom">
                    <div class="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">25 min</span>
                    </div>

                    <p className="label pb-0 mt-4">Murabaha Agreement Generation to 
Customer Acceptance: Digital</p>
                    <div class="d-flex align-items-center p-2 border-bottom">
                    <div class="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">25 min</span>
                    </div>

                    <p className="label pb-0 mt-4 w-75">Murabaha Agreement Generation to
Customer Acceptance:- Physical</p>
                    <div class="d-flex align-items-center p-2 border-bottom">
                    <div class="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">10 min</span>
                    </div>


                    <p className="label pb-0 mt-4 w-75">Customer Acceptance to 
Agent response</p>
                    <div class="d-flex align-items-center p-2 border-bottom">
                    <div class="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">5 min</span>
                    </div>

                    <p className="label pb-0 mt-4 w-75">Agent response to funding 
and Letter issuance</p>
                    <div class="d-flex align-items-center p-2">
                    <div class="progress dashboard-progess bar-wrapper w-80 me-3">
                        <div
                          class="progress-bar skill-bar desh_progress-bar"
                          role="progressbar"
                          aria-valuenow="76"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="time">5 min</span>
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
