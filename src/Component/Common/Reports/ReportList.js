import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ReportList() {
  const params = useParams();
  const fetchParams = params.reportList;
  console.log(fetchParams, "====>7");

  const [arrList, setArrList] = useState([
    {
      date: new Date(),
      app_name: "220872-00",
      customer_name: "Nolan Levin",
      mobileNo: "+1 4785 4587 451",
      status:'Error'
    },
    {
      date: new Date(),
      app_name: "220873-00",
      customer_name: "Aaeesha Mohamed ",
      mobileNo: "+1 4785 4587 451",
      status:'Pending'
    },
    {
      app_name: "220874-00",
      customer_name: "Jaydon Calzoni",
      email: "jaydon@yahoo.com",
      date: new Date(),
      mobileNo: "+1 4785 4587 451",
      status:'Pending'
    },
    {
      app_name: "220875-00",
      customer_name: "Maadhav Nazar ",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status:'Error'
    },
    {
      app_name: "220876-00",
      customer_name: "Emerson Vetrovs",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status:'Error'
    },
    {
      app_name: "220877-00",
      customer_name: "Haajar Rahman",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status:'Pending'
    },
    {
      app_name: "220878-00",
      customer_name: "Marcus Lipshutz",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status:'Pending'
    },
    {
      app_name: "220879-00",
      customer_name: "Zaire Culhane",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status:'Pending'
    },
    {
      app_name: "220880-00",
      customer_name: "Saadiq Yousuf ",
      mobileNo: "+1 4785 4587 451",
      date: new Date(),
      status:'Error'
    },
  ]);

  return (
    <>
      <section className="">
        <div className="upload_new_application">
          <h3 className="ps-5">
            {fetchParams === "error" ? "Pending / Error" : "Disbursal Report"}{" "}
          </h3>

          <div className="">
            <div className="row align-items-center py-1 px-5">
              <div className="col-md-3 px-4">
                <span>Filter</span>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Months</option>
                  <option value="1">Last day</option>
                  <option value="2">Last week</option>
                  <option value="2">Last month</option>
                </select>
              </div>

              <div className="col-md-3">
                {fetchParams === "error" && (
                  <>
                    <span>Status filter</span>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>All</option>
                      <option value="1">Pending</option>
                      <option value="2">Error</option>
                    </select>
                  </>
                )}
              </div>

              <div className="col-3 ">
                <span>Date from</span>
                <input className="form-control" type="date" />
              </div>
              <div className="col-3 ">
                <span>Date to</span>
                <input className="form-control" type="date" />
              </div>
            </div>
          </div>

          <div class="input-group p-4">
            <label className="d-block label py-3 w-100">
              Search Applications
            </label>
            <button
              type="button"
              class="btn border-end-0 rounded border bg-white"
              data-mdb-ripple-init=""
            >
              <i class="fas fa-search fs-4 text-secondary"></i>
            </button>
            <input
              type="text"
              class="form-control p-2 border-start-0"
              placeholder="Search"
            ></input>
          </div>
          <div className="">
            <div className=" row my-5" id="table-contexual">
              <div className="col-12">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">S.No. </th>
                      <th scope="col">Import Date</th>
                      <th scope="col">Customer name</th>
                      <th scope="col">Application no.</th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">Status</th>
                      <th scope="col">{fetchParams === "error" ?'Reason' :'Action'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.map((item, index) => (
                      <tr
                        className="pointer"
                        // onClick={() => navigateToAgreement(item)}
                      >
                        <td className="ps-4">{index + 1}</td>
                        <td>{item?.date.toLocaleDateString()}</td>
                        <td>{item?.customer_name}</td>
                        <td>{item?.app_name}</td>
                        <td>{item?.mobileNo}</td>
                        {fetchParams === "error" ? <td>
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
                      </td> : <td style={{ color: "#29CC6A" }}>Disbursed</td>}
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
