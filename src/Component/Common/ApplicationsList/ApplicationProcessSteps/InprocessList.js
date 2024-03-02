import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useDispatch } from "react-redux";

function InprocessList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [arrList, setArrList] = useState([
    {
      app_name: "220872-00",
      status: "Done",
    },
    {
      app_name: "220873-00",
      status: "In Progress",
    },
    {
      app_name: "220874-00",
      status: "Done",
    },
    {
      app_name: "220875-00",
      status: "Done",
    },
    {
      app_name: "220876-00",
      status: "In Progress",
    },
    {
      app_name: "220877-00",
      status: "In Progress",
    },
    {
      app_name: "220878-00",
      status: "In Progress",
    },
    {
      app_name: "220879-00",
      status: "Done",
    },
    {
      app_name: "220880-00",
      status: "Done",
    },
  ]);


  // navigate to agreement
  const navigateToAgreement = (item) =>{
    navigate("/admin/application/murabaha");
    dispatch(SetpopupReducerData({ modalType: "MURABAHA", murabahaModal: true }));
  }

  return (
    <section className="">
      
        <div className="upload_new_application">
          <h3>Upload New Application</h3>
          <div className="top_list">
            <div class=" align-items-center p-1">
              <div class="progress bar-wrapper w-100 h-6px">
                <div
                  class="progress-bar skill-bar desh_progress-bar"
                  role="progressbar"
                  aria-valuenow="76"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p style={{ fontWeight: "bold" }}>10 of 30 Applications Done</p>
            </div>
          </div>

          <div className="">
            <div className=" row my-5" id="table-contexual">
              <div className="col-12">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Application Name </th>
                      <th scope="col">Status</th>
                      <th scope="col">Rule 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.map((item) => (
                      <tr className="pointer" onClick={() => navigateToAgreement(item)}>
                        <td>{item?.app_name}</td>
                        <td>
                          <span
                            style={{
                              color:
                                item?.status === "Done" ? "#29CC6A" : "#EAB308",
                            }}
                          >
                            {item?.status}
                          </span>
                        </td>{" "}
                        <td>
                          <img src="../../images/icon2.png"></img>
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
  );
}

export default InprocessList;
