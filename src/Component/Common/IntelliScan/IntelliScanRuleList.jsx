import React, { useState } from "react";
import ListingWithRule from "../ApplicationsList/ListingWithRule";
import Filter from "../ApplicationsList/Filter";

function IntelliScanRuleList() {
  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("");

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
                  //   onChange={fetchModal}
                  value={action}
                  name="action"
                >
                  <option value={""}>Select</option>
                  <option value={"APPROVED"}>Proceed all cases</option>
                  <option value={"PROCEED&EXCEPTION"}>
                    Proceed with exception
                  </option>
                  <option value={"REJECTED"}>Download</option>
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
          <div className="">
            <ListingWithRule
              selectedApplication={selectedApplication}
              listingData={arrList}
              handleChangeCheckBox={handleChangeCheckBox}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default IntelliScanRuleList;
