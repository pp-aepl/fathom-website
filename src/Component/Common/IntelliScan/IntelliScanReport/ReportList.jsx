import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

function IntelliScanReportList() {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const navigate = useNavigate();
  return (
    <>
      <section className="">
        <div className="main_dashboar">
          <div className="voucherFormMain">
            <h3 className=" card-title">Reports</h3>
            <div className="">
              <div className=" row pt-4">
                <div className="col-md-3 ">
                  <label className="label">Date from</label>
                  <DatePicker
                    selected={dateFrom}
                    onChange={(date) => {
                      setDateFrom(date);
                    }}
                    className="form-control p-3"
                    isClearable={dateFrom}
                    placeholderText="Select start date"
                  />
                </div>
                <div className="col-md-3 ">
                  <label className="label">Date to</label>
                  <DatePicker
                    minDate={dateFrom}
                    maxDate={new Date()}
                    selected={dateTo}
                    onChange={(date) => {
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
                    // onChange={handleChangeReport}
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
              <div className=" row my-5" id="table-contexual">
                <div className="col-12">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th className="ps-4   p-2" scope="col">
                          Products{" "}
                        </th>
                        <th className="ps-4 text-center  p-2" scope="col">
                          Passed Cases{" "}
                        </th>
                        <th className="ps-4 text-center  p-2" scope="col">
                          Total Cases Checked{" "}
                        </th>
                        <th className="ps-4 text-center  p-2" scope="col">
                          Total Error Cases{" "}
                        </th>
                        <th className="ps-4 text-center  p-2" scope="col">
                          Exception Cases{" "}
                        </th>
                        <th className="ps-4 text-center  p-2" scope="col">
                          Rectified Cases{" "}
                        </th>
                        <th className="ps-4 text-center  p-2" scope="col">
                          Error Percentage{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="pointer">
                        <td scope="col" className="ps-4 border p-2">
                          Personal Finance
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          252
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          252
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          9
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          5
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          5
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          3.6
                        </td>
                      </tr>
                      <tr className="pointer">
                        <td scope="col" className="ps-4 border p-2">
                          Business Finance
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          52
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          25
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          19
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          15
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          5
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          13.6
                        </td>
                      </tr>
                      <tr className="pointer">
                        <td scope="col" className="ps-4 border p-2">
                          Credit Card
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          155
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          152
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          19
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          18
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          15
                        </td>
                        <td scope="col" className="ps-4 text-center border p-2">
                          12
                        </td>
                      </tr>

                      <tr className="pointer border mt-4">
                        <td className="ps-4 ">
                          <b>Total</b>
                        </td>
                        <td className="ps-4 text-center ">
                          <b>459</b>
                        </td>
                        <td className="ps-4 text-center ">
                          <b>429</b>
                        </td>
                        <td className="ps-4 text-center ">
                          <b>47</b>
                        </td>
                        <td className="ps-4 text-center ">
                          <b>38</b>
                        </td>
                        <td className="ps-4 text-center ">
                          <b>25</b>
                        </td>
                        <td className="ps-4 text-center "></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntelliScanReportList;
