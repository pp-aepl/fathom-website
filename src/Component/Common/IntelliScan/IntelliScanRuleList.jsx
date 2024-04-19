import React, { useState } from "react";
import ListingWithRule from "../ApplicationsList/ListingWithRule";
import Filter from "../ApplicationsList/Filter";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
import { SetpopupReducerData } from "../../../store/reducer";
function IntelliScanRuleList() {
  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    pageNo: 1,
    limit: 30,
    startDate: "",
    endDate: "",
    periodFrom: "",
    rule: "",
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
  const handleChangeRule = (e) => {
    setFilterKey({
      ...filterKey,
      rule: !e.target.value ? "" : e.target.value === "true" ? true : false,
      pageNo: 1,
    });
  };
  const fetchModal = (e) => {
    // if (selectedApplication?.length === 0) {
    //   alert("Please select application to proceed.");
    //   return;
    // }
    let value = e.target.value;
    setAction(value);
    if (value === "PROCEED_ALL_CASE") {
      dispatch(
        SetpopupReducerData({
          modalType: "PROCEED_ALL_CASE",
          showModal: true,
          selectedApplication: selectedApplication,
          status: value,
        })
      );
    } else if (value === "DOWNLOAD") {
      dispatch(
        SetpopupReducerData({
          modalType: "DOWNLOAD",
          showModal: true,
          selectedApplication: selectedApplication,
          status: value,
        })
      );
    } else if (value === "PROCEED&EXCEPTION") {
      dispatch(
        SetpopupReducerData({
          modalType: "EXCEPTION",
          showModal: true,
          type: "SUCCESSFULLY",
          selectedApplication: selectedApplication,
          status: value,
        })
      );
    }
  };
  return (
    <>
      <section className="">
        <div className="upload_new_application">
          <h3 className="ps-5">Personal Finance Murbaha Details </h3>
          <div className="top_list">
            <div className="row p-4 ps-4">
              <div
                className="col-12  p-3 mb-2 "
                style={{ backgroundColor: "aliceblue" }}
              >
                <img src="../../../images/doneCircle.png" width={25} alt="" />{" "}
                <CiCircleCheck />
                <span className="checked-rule">
                  {" "}
                  All documents are checked as per defined rules
                </span>
              </div>
              <div className="col-2">
                <label className="label">Rule</label>
                <select
                  className="form-select p-3"
                  name="period"
                  value={filterKey?.rule}
                  onChange={handleChangeRule}
                >
                  <option value={""}>Select</option>
                  <option value={true}>Pass</option>
                  <option value={false}>Fail</option>
                </select>
              </div>
              <div className="col-7">
                <div className="row ">
                  <Filter
                    filterKey={filterKey}
                    setFilterKey={setFilterKey}
                    hideSearch={true}
                  />
                </div>
              </div>

              <div className="col-3">
                <label className="label">&nbsp;</label>
                <select
                  className="form-select p-3"
                  onChange={fetchModal}
                  value={action}
                  name="action"
                >
                  <option value={""}>Select</option>
                  <option value={"PROCEED_ALL_CASE"}>Proceed all cases</option>
                  <option value={"PROCEED&EXCEPTION"}>
                    Proceed with exception
                  </option>
                  <option value={"DOWNLOAD"}>Download</option>
                </select>
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
              className="form-control p-2 border-start-0"
              placeholder="Search"
              name="serial_number"
              value={filterKey.serial_number}
              inputMode="numeric"
              onChange={(e) =>
                setFilterKey({
                  ...filterKey,
                  serial_number: e.target.value,
                })
              }
            ></input>
          </div>
          {/* <div className="">
            <ListingWithRule
              selectedApplication={selectedApplication}
              listingData={arrList}
              handleChangeCheckBox={handleChangeCheckBox}
            />
          </div> */}

          <div className=" row my-5" id="table-contexual">
            <div className="col-12 ">
              <div className=" table_scroll">
                <table class="table ">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col" className="px-2 mx-4">
                        {" "}
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">S.No.</span>{" "}
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">Date</span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">Application no.</span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">Status</span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          {" "}
                          Rule 1{" "}
                          <CiCircleInfo title="Rule 1:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>{" "}
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 2{" "}
                          <CiCircleInfo title="Rule 2:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 3{" "}
                          <CiCircleInfo title="Rule 3:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 4{" "}
                          <CiCircleInfo title="Rule 4:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 5{" "}
                          <CiCircleInfo title="Rule 5:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 6
                          <CiCircleInfo title="Rule 6:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 7
                          <CiCircleInfo title="Rule 7:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 8{" "}
                          <CiCircleInfo title="Rule 8:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 9{" "}
                          <CiCircleInfo title="Rule 9:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 10
                          <CiCircleInfo title="Rule 10:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 11
                          <CiCircleInfo title="Rule 11:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 12
                          <CiCircleInfo title="Rule 12:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 13
                          <CiCircleInfo title="Rule 13:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">
                          Rule 14{" "}
                          <CiCircleInfo title="Rule 14:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " />
                        </span>
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-danger mx-4 px-2">
                        <span
                          className="text-danger m-5 p-2"
                          style={{
                            backgroundColor: "#fcdada",
                            borderRadius: "12px",
                          }}
                        >
                          Fail
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
                  
                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-success mx-4 px-2">
                        <span
                          className="text-success m-5 p-2"
                          style={{
                            backgroundColor: "#d4f5e1",
                            borderRadius: "12px",
                          }}
                        >
                          Pass
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-danger mx-4 px-2">
                        <span
                          className="text-danger m-5 p-2"
                          style={{
                            backgroundColor: "#fcdada",
                            borderRadius: "12px",
                          }}
                        >
                          Fail
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
                 
                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-success mx-4 px-2">
                        <span
                          className="text-success m-5 p-2"
                          style={{
                            backgroundColor: "#d4f5e1",
                            borderRadius: "12px",
                          }}
                        >
                          Pass
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-danger mx-4 px-2">
                        <span
                          className="text-danger m-5 p-2"
                          style={{
                            backgroundColor: "#fcdada",
                            borderRadius: "12px",
                          }}
                        >
                          Fail
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
                 
                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-success mx-4 px-2">
                        <span
                          className="text-success m-5 p-2"
                          style={{
                            backgroundColor: "#d4f5e1",
                            borderRadius: "12px",
                          }}
                        >
                          Pass
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
                  
                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-danger mx-4 px-2">
                        <span
                          className="text-danger m-5 p-2"
                          style={{
                            backgroundColor: "#fcdada",
                            borderRadius: "12px",
                          }}
                        >
                          Fail
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
                  
                    <tr>
                      <td className="px-2 mx-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">13/05/2023</span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">1220872-00</span>
                      </td>
                      <td className="text-success mx-4 px-2">
                        <span
                          className="text-success m-5 p-2"
                          style={{
                            backgroundColor: "#d4f5e1",
                            borderRadius: "12px",
                          }}
                        >
                          Pass
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon1.png" />
                        </span>
                      </td>
                      <td className="px-2 mx-4">
                        <span className="m-5">
                          <img src="../../images/icon2.png" />
                        </span>
                      </td>

                      <td className="px-2 mx-4">
                        <a href={"#"} target="_blank">
                          <button
                            className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                            // onClick={() => handleView(item?.murbaha_url)}
                          >
                            View
                          </button>
                        </a>
                      </td>
                    </tr>
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

export default IntelliScanRuleList;
