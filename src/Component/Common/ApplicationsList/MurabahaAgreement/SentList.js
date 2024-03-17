/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import ExceptionModal from "../../../PopupModal/ExceptionModal";
import SuccessfullyModal from "../../../PopupModal/SuccessfullyModal";
import AgentModal from "../../../PopupModal/AgentModal";
import { fetchApplicationList } from "../../../../Config/FetchListingData";
import DatePicker from "react-datepicker";
import moment from "moment";

function SentList() {
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const {
    exceptionModal = false,
    successModal = false,
    agentModal = false,
  } = PopupReducer?.modal;

  const [dummyList, setDummyList] = useState([
    {
      CRN_NO: "220872-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Digital Signature",
    },
    {
      CRN_NO: "220873-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Paper Print",
    },
    {
      CRN_NO: "220874-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Digital Signature",
    },
    {
      CRN_NO: "220875-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Digital Signature",
    },
    {
      CRN_NO: "220876-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Paper Print",
    },
    {
      CRN_NO: "220877-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Paper Print",
    },
    {
      CRN_NO: "220878-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Paper Print",
    },
    {
      CRN_NO: "220879-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Digital Signature",
    },
    {
      CRN_NO: "220880-00",
      currentDate: new Date(),
      channel: true,
      rules: "5 / 7",
      status: "Digital Signature",
    },
  ]);

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        modalType: "CHANNELLIST",
        successModal: true,
        type: typeSubmit,
      })
    );
    // dispatch(SetpopupReducerData({modalType: "EXCEPTION",exceptionModal: true,type: "CHANNELLIST"})
    // );
  };
  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("");

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    // pageNo: currentPage,
    // limit: perPage,
    startDate: "",
    endDate: "",
    periodFrom: "",
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
  const handleSelectFilter = (e) => {
    let value = e.target.value;
    let arr = [];
    setAction(value);
    if (value === "ALL") {
      arr = arrList?.map((ele) => ele._id);
    } else if (value === "Signature") {
      arr = arrList?.filter((ele) => !ele?.channel)?.map((e) => e?._id);
    } else if (value === "Print") {
      arr = arrList?.filter((ele) => ele?.channel)?.map((e) => e?._id);
    }
    setSelectedApplication(arr);
  };

  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: "AWAITING_DIGITAL_SINGNATURE",
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data, "dattt");
        setArrList(data?.results);
      } else {
        setArrList([...dummyList]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [filterKey]);

  useEffect(() => {
    fetchListingData();
  }, [fetchListingData]);
  return (
    <>
      {exceptionModal && <ExceptionModal />}
      {successModal && <SuccessfullyModal />}
      {agentModal && <AgentModal />}

      <section className="px-3">
        <div className="upload_new_application">
          <h3>Murabaha Agreement Generation</h3>
          <div className="top_list">
            <div className="row pt-4">
              <div className="col-md-2">
                <label>Filter</label>
                <div className="border rounded ">
                  {/* <div class="form-check d-inline-block verticle">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="check2"
                      name="option2"
                      value="something"
                    ></input>
                  </div> */}
                  <select
                    class="form-select p-3"
                    name="action"
                    value={action}
                    onChange={handleSelectFilter}
                  >
                    <option value={""}>Select</option>
                    <option value={"ALL"}>All</option>
                    <option value="Signature">Digital Signature</option>
                    <option value="Print">Paper Print</option>
                  </select>
                </div>
              </div>
              <div className="col-2">
                <label className="">Search Application</label>
                <input
                  type="text"
                  className="form-control p-3"
                  name="serial_number"
                  value={filterKey.serial_number}
                  inputMode="numeric"
                  placeholder="Search..."
                  onChange={(e) =>
                    setFilterKey({
                      ...filterKey,
                      serial_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-2">
                <span>Date from</span>
                <div className=" text-right">
                  <DatePicker
                    selected={filterKey.startDate}
                    onChange={(date) => {
                      setFilterKey({
                        ...filterKey,
                        startDate: date,
                      });
                    }}
                    className="form-control p-3"
                    isClearable={filterKey.startDate}
                    placeholderText="Select start date"
                  />
                </div>
              </div>
              <div className="col-2">
                <span>Date to</span>
                <div className=" text-right">
                  <DatePicker
                    minDate={filterKey.startDate}
                    maxDate={new Date()}
                    selected={filterKey.endDate}
                    onChange={(date) => {
                      setFilterKey({
                        ...filterKey,
                        endDate: date,
                      });
                    }}
                    className="form-control p-3"
                    isClearable={filterKey.endDate}
                    placeholderText="Select end date"
                  />
                </div>
              </div>
              <div className="col-3 mt-2">
                <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                  <button style={{ width: "274px", marginRight: "9px" }}>
                    Check for update
                  </button>
                  <button
                    style={{ width: "274px" }}
                    onClick={(e) => onSubmit(e, "CHANNELLIST")}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className=" row my-5" id="table-contexual">
            <div className="col-12">
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">S.No. </th>
                    <th scope="col">Date</th>
                    <th scope="col">Application no.</th>
                    <th scope="col">Channel</th>

                    <th scope="col">Status</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {arrList?.map((item, index) => (
                    <tr>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id={item._id}
                            checked={selectedApplication?.includes(item?._id)}
                            onChange={(e) => handleChangeCheckBox(e, item._id)}
                          />
                        </div>
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        {" "}
                        {moment(item?.createdAt)
                          .local()
                          .format("DD/MM/YYYY hh:mm a")}
                      </td>
                      <td>{item?.serial_number}</td>
                      <td>{item?.channel && <span>Received</span>}</td>
                      <td>
                        <span
                          style={{
                            color:
                              item?.status === "Digital Signature"
                                ? "#8282FF"
                                : "#0099FF",
                          }}
                        >
                          {item?.status}
                        </span>
                      </td>

                      <td>
                        <span className="channel_border">View</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SentList;
