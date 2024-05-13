/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import moment from "moment";
import React from "react";

function ListingWithRule({
  selectedApplication = [],
  handleChangeCheckBox = () => {},
  listingData = [],
  inProcess = false,
}) {
  return (
    <>
      <div className=" row my-5 px-3" id="table-contexual">
        <div className="col-12">
          <table className="table" id="exportTable">
            <thead className="thead-light">
              <tr>
                {!inProcess && <th scope="col"> </th>}
                <th scope="col">S.No. </th>
                <th scope="col">Date</th>
                <th scope="col">Application no.</th>
                <th>Action</th>

                <th scope="col">Status </th>

                {listingData
                  ?.find((el) => el?.rules?.length)
                  ?.rules?.map((ele, index) => (
                    <th scope="col">
                      Rule {index + 1}
                      <i
                        class="fas fa-info-circle pointer large-tooltip mx-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`Rule${index + 1}:${ele?.ruleId?.rule_name}`}
                      ></i>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {listingData?.length > 0
                ? listingData?.map((ele, index) => (
                    <tr key={index}>
                      {!inProcess && (
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id={ele._id}
                              checked={selectedApplication?.includes(ele?._id)}
                              onChange={(e) => handleChangeCheckBox(e, ele._id)}
                            />
                          </div>
                        </td>
                      )}
                      <td>{index + 1}</td>
                      <td>
                        {moment(ele?.createdAt)
                          .local()
                          .format("DD/MM/YYYY hh:mm a")}
                      </td>
                      <td>{ele?.serial_number}</td>
                      <td>
                        <a href={ele?.imported_url} target="_blank">
                          <button className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills">
                            View
                          </button>
                        </a>
                      </td>
                      <td>
                        <span
                          className={
                            ele?.showStatus === "Done" ? "green" : "orange"
                          }
                        >
                          {ele?.showStatus}
                        </span>
                      </td>

                      {ele?.rules?.map((item) => (
                        <>
                          <td title={item?.ruleId?.rule_name}>
                            <img
                              src={
                                item?.status
                                  ? "../../images/icon2.png"
                                  : "../../images/icon1.png"
                              }
                              alt={item?.status ? "Yes" : "No"}
                            />
                          </td>
                        </>
                      ))}
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListingWithRule;
