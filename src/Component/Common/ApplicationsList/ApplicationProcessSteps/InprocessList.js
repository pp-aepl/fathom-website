import React, { useState } from "react";

function InprocessList() {
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
  ]);

  return (
    <section className="">
      <div className="container">
        <div className="voucherFormMain upload_new_application">
          <h3>Application in process</h3>

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
                      <tr>
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
      </div>
    </section>
  );
}

export default InprocessList;
