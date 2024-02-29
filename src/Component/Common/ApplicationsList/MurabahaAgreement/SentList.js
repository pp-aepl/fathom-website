import React, { useState } from "react";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import ExceptionModal from "../../../PopupModal/ExceptionModal";
import SuccessfullyModal from "../../../PopupModal/SuccessfullyModal";
import AgentModal from "../../../PopupModal/AgentModal";

function SentList() {
    const dispatch = useDispatch();
    const { PopupReducer } = useSelector((state) => state);
    const { exceptionModal = false } = PopupReducer?.modal;
    const { successModal = false } = PopupReducer?.modal;
    const { agentModal = false } = PopupReducer?.modal;

  const [arrList, setArrList] = useState([
    {
      CRN_NO: "220872-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Digital Signature",
    },
    {
      CRN_NO: "220873-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Paper Print",
    },
    {
      CRN_NO: "220874-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Digital Signature",
    },
    {
      CRN_NO: "220875-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Digital Signature",
    },
    {
      CRN_NO: "220876-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Paper Print",
    },
    {
      CRN_NO: "220877-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Paper Print",
    },
    {
      CRN_NO: "220878-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Paper Print",
    },
    {
      CRN_NO: "220879-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Digital Signature",
    },
    {
      CRN_NO: "220880-00",
      currentDate: new Date(),
      channel: true,
      rules: 5 / 7,
      status: "Digital Signature",
    },
  ]);

    // update create api
    const onSubmit = async (e, typeSubmit) => {
        e.preventDefault();
        dispatch(SetpopupReducerData({modalType: "EXCEPTION",exceptionModal: true,type: "CHANNELLIST"})
        );
      };

  return (
    <>
    {exceptionModal && <ExceptionModal/>}
    {successModal && <SuccessfullyModal />}
    {agentModal && <AgentModal />}

     <section className="">
      <div className="container">
        <div className="voucherFormMain upload_new_application">
          <h3>Upload New Application</h3>
          <div className="top_list">
            <div className="row pt-4">
              <div className="col-md-3">
                <label>Filter</label>
                <div className="border rounded ">
                  <div class="form-check d-inline-block verticle">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="check2"
                      name="option2"
                      value="something"
                    ></input>
                  </div>
                  <select
                    class="form-select w-87 d-inline-block border-0"
                    aria-label="Default select example"
                  >
                    <option selected>Select all</option>
                    <option value="1">Digital Signature</option>
                    <option value="2">Paper Print</option>
                  </select>
                </div>
              </div>

              <div className="col-2">
                <span>Date from</span>
                <div className=" text-right">
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                  ></input>
                </div>
              </div>
              <div className="col-2">
                <span>Date to</span>
                <div className=" text-right">
                  <input
                    type="date"
                    id="birthday"
                    className="form-control"
                    name="birthday"
                  ></input>
                </div>
              </div>
              <div className="col-3">
                <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                  <button style={{ width: "274px", marginRight: "9px" }}>
                    Check for update
                  </button>
                  <button style={{ width: "274px" }} onClick={(e) => onSubmit(e, "create")} >Proceed</button>
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
                    <th scope="col">Check CRN</th>
                    <th scope="col">Rules</th>
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
                            id="check1"
                            name="option1"
                            value="something"
                          ></input>
                        </div>
                      </td>
                      <td>{index + 1}</td>
                      <td>{item?.currentDate.toLocaleDateString()}</td>
                      <td>{item?.CRN_NO}</td>
                      <td>
                        <span>{item?.rules}</span>
                      </td>
                      {item?.channel && (
                        <td>
                          <span className="channel_border">Reserved</span>
                        </td>
                      )}
                      <td>
                        <span
                          style={{
                            color:
                              item?.status === "Digital Signature"
                                ? "#29CC6A"
                                : "#EAB308",
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
      </div>
    </section>
    </>
   
  );
}

export default SentList;
