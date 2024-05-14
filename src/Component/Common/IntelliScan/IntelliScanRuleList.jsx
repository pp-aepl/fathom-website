import React, { useCallback, useEffect, useState } from "react";
import ListingWithRule from "../ApplicationsList/ListingWithRule";
import Filter from "../ApplicationsList/Filter";
import { CiCircleInfo, CiCircleCheck } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { SetpopupReducerData } from "../../../store/reducer";
import { fetchApplicationList } from "../../../Config/FetchListingData";
import moment from "moment";
import Rules from "../ApplicationsList/Rules";
function IntelliScanRuleList() {
  const [arrList, setArrList] = useState([]);
  const [rulesColumnArr, setRulesArr] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("");
  const [showRules, setShowRules] = useState(false);
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
    if (selectedApplication?.length === 0) {
      alert("Please select application to proceed.");
      return;
    }
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
    }
    // else if (value === "DOWNLOAD") {
    //   dispatch(
    //     SetpopupReducerData({
    //       modalType: "DOWNLOAD",
    //       showModal: true,
    //       selectedApplication: selectedApplication,
    //       status: value,
    //     })
    //   );
    // }
    else if (value === "PROCEED&EXCEPTION") {
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
  const setRuleApplication = (data) => {
    let arr = [];
    if (filterKey?.rule !== "") {
      arr = data?.map((ele) => ele?._id);
    }
    setSelectedApplication(arr);
  };

  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: "AWAITING_COMMODITY_PURCHASE",
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        setRuleApplication(data?.results);

        setArrList(data?.results);
        // to calculate the no of columns for rules ( maxlength)
        const maxLength = Math.max(
          ...data?.results.map((obj) => obj.rules.length)
        );
        let maxRuleObj = data?.results.find(
          (x) => x.rules.length === maxLength
        );
        let rulesColumnArr = [...maxRuleObj.rules];
        console.log({ rulesColumnArr });

        setRulesArr([...rulesColumnArr]);

        console.log(data?.results, "data?.resultsdata?.results");
      } else {
        setArrList([]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [filterKey]);

  const handleView=(url)=>{
    window.open(url, '_blank')
  }

  useEffect(() => {
    fetchListingData();
  }, [fetchListingData]);

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new window.bootstrap.Tooltip(tooltip);
    });
  }, []);

  return (
    <>
      <section className="">
        <div className="upload_new_application">
          <h3 className="ps-5">Personal Finance Murbaha Details </h3>
          <div className="top_list">
            {showRules && <Rules />}
            <div className="mini my-2 p-4 border-bottom">
              {" "}
              <span className="cursar" onClick={() => setShowRules(!showRules)}>
                {" "}
                <img src="../../images/arrow-circle-down.svg"></img>{" "}
                {showRules ? "Minimize" : "Show"} Rule{" "}
              </span>
            </div>
            <div className="row p-4 ps-4">
              {/* <div
                className="col-12  p-3 mb-2 "
                style={{ backgroundColor: "aliceblue" }}
              >
                <CiCircleCheck color="blue" size={30} />

                <span className="checked-rule">
                  {" "}
                  All documents are checked as per defined rules
                </span>
              </div> */}
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
                  {/* <option value={"DOWNLOAD"}>Download</option> */}
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

          <div className=" row my-5" id="table-contexual">
            <div className="col-12 ">
              <div className=" table_scroll">
                <table className="table " id="exportTable">
                  <thead className="thead-light">
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
                        Action
                      </th>
                      <th scope="col" className="px-2 mx-4">
                        <span className="m-5">Status</span>
                      </th>
                      {rulesColumnArr?.length > 0
                        ? rulesColumnArr?.map((item, ruleIndex) => (
                            <>
                              <th scope="col" className="px-2 mx-4">
                                <span className="m-5">
                                  {" "}
                                  Rule {ruleIndex + 1}
                                  <i
                                    className="fas fa-info-circle pointer large-tooltip mx-2"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={`Rule${ruleIndex + 1}:${
                                      item?.ruleId?.rule_name
                                    }`}
                                  ></i>
                                  {/* <CiCircleInfo title="Rule 1:In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate  " /> */}
                                </span>{" "}
                              </th>
                            </>
                          ))
                        : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.length > 0
                      ? arrList?.map((ele, index) => (
                          <tr key={index}>
                            <td className="px-2 mx-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={ele._id}
                                  checked={selectedApplication?.includes(
                                    ele?._id
                                  )}
                                  onChange={(e) =>
                                    handleChangeCheckBox(e, ele._id)
                                  }
                                ></input>
                              </div>
                            </td>
                            <td className="px-2 mx-4">
                              <span className="m-5">{index + 1}</span>
                            </td>
                            <td className="px-2 mx-4">
                              {moment(ele?.createdAt)
                                .local()
                                .format("DD/MM/YYYY hh:mm a")}
                            </td>
                            <td className="px-2 mx-4">
                              <span className="m-5">{ele?.serial_number}</span>
                            </td>
                            <td className="px-2 mx-4">
                              <a>
                                <button
                                  className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                                  onClick={() => handleView(ele?.imported_url)}
                                >
                                  View
                                </button>
                              </a>
                            </td>
                            {/* <td className="text-danger mx-4 px-2">
                              <span
                                className="text-danger m-5 p-2"
                                style={{
                                  backgroundColor: "#fcdada",
                                  borderRadius: "12px",
                                }}
                              >
                                Fail
                              </span>
                            </td> */}

                            <td className="mx-4 px-2">
                              <span
                                className={
                                  ele?.showStatus === "Done"
                                    ? "green"
                                    : "orange"
                                }
                              >
                                {ele?.showStatus}
                              </span>
                            </td>
                            <>
                              {ele?.rules.length > 0
                                ? ele.rules.map((rule, index) => (
                                    <td
                                      className="px-2 mx-4"
                                      key={`${index}-1`}
                                    >
                                      <span className="m-5">
                                        {rule.status ? (
                                          <img src="../../images/icon2.png" />
                                        ) : (
                                          <img src="../../images/icon1.png" />
                                        )}
                                      </span>
                                    </td>
                                  ))
                                : null}
                            </>
                          </tr>
                        ))
                      : ""}
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
