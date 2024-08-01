/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { SetpopupReducerData } from "../../../store/reducer";
import moment from "moment";
import Filter from "../ApplicationsList/Filter";
import { fetchApplicationList } from "../../../Config/FetchListingData";

function IntelliscanList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let status = searchParams.get("status") ?? "";

  const dispatch = useDispatch();

  const [arrList, setArrList] = useState([]);

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    pageNo: 1,
    limit: 30,
    startDate: "",
    endDate: "",
    periodFrom: "",
  });

  const handleFilterChange = (e) => {
    setFilterKey({ ...filterKey, [e.target.name]: e.target.value, pageNo: 1 });
  };
  const handleView = (url) => {
    dispatch(
      SetpopupReducerData({
        modalType: "OPEN_DOC",
        showModal: true,
        docPdf: url,
      })
    );
  };
  const fetchListingData = useCallback(async () => {
    try {
      let checkStatus =
        status === ""
          ? ""
          : status === "pass"
          ? "COMPLETED"
          : status === "fail"
          ? "REJECTED"
          : status === "pending"
          ? "PENDING"
          : "";
      let payload = {
        status: checkStatus,
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data);
        setArrList(data?.results);
      } else {
        setArrList([]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [status, filterKey]);

  useEffect(() => {
    fetchListingData();
  }, [status, fetchListingData]);
  return (
    <>
      <section className="">
        <div className="upload_new_application">
          <div className="">
            <div className="row my-5" id="table-contexual">
              <div className="col-12">
                <div className="">
                  <div className="">
                    <div className="row align-items-center py-1 px-5">
                      <Filter
                        filterKey={filterKey}
                        setFilterKey={setFilterKey}
                      />
                    </div>
                  </div>
                  <div className="">
                    {arrList?.length > 0 ? (
                      <div className=" row my-5" id="table-contexual">
                        <div className="col-12">
                          <table className="table" id="exportTable">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col" className="ps-4">
                                  S.No.{" "}
                                </th>
                                <th scope="col">Import Date </th>
                                <th scope="col">Application no. </th>
                                <th scope="col">Status </th>
                                <th scope="col">Action </th>
                              </tr>
                            </thead>
                            <tbody>
                              {arrList?.map((item, index) => (
                                <tr className="pointer" key={index}>
                                  <td className="ps-4">{index + 1}</td>
                                  <td>
                                    {moment(item?.createdAt)
                                      .local()
                                      .format("DD/MM/YYYY hh:mm a")}
                                  </td>
                                  <td>{item?.serial_number}</td>
                                  <td>
                                    <span
                                      className={
                                        item?.showStatus === "Completed"
                                          ? "green"
                                          : (item?.showStatus === "Rejected" || item?.showStatus === 'REJECTED')
                                          ? "red"
                                          : "orange"
                                      }
                                    >
                                      {item?.showStatus}
                                    </span>
                                  </td>
                                  <td>
                                    <a
                                      href={item?.imported_url}
                                      target="_blank"
                                    >
                                      <button
                                        className="view_btn btn btn-outline-secondary p-2 rounded-circle-pills"
                                        // onClick={() =>
                                        //   handleView(item?.imported_url)
                                        // }
                                      >
                                        View
                                      </button>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntelliscanList;
