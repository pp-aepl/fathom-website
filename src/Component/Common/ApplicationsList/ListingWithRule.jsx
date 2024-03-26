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
          <table className="table">
            <thead className="thead-light">
              <tr>
                {!inProcess && <th scope="col"> </th>}
                <th scope="col">S.No. </th>
                <th scope="col">Date</th>
                <th scope="col">Application no.</th>
                {inProcess && <th scope="col">Status </th>}

                {listingData?.[0]?.rules?.map((ele, index) => (
                  <th scope="col">Rule {index + 1}</th>
                ))}
                <th>Action</th>
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
                      {inProcess && (
                        <td>
                          <span
                            className={
                              ele?.showStatus === "Done" ? "green" : "orange"
                            }
                          >
                            {ele?.showStatus}
                          </span>
                        </td>
                      )}

                      {ele?.rules?.map((item) => (
                        <>
                          <td title={item?.ruleId?.rule_name}>
                            <img
                              src={
                                item?.status
                                  ? "../../images/icon2.png"
                                  : "../../images/icon1.png"
                              }
                            />
                          </td>
                        </>
                      ))}
                      <td>
                        <a
                          href={ele?.reject_exception_document}
                          target="_blank"
                        >
                          <button className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills">
                            View
                          </button>
                        </a>
                      </td>
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
