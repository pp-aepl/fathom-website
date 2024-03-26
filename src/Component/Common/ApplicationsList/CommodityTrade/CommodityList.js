/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../../store/reducer";
import ProceedModal from "../../../PopupModal/ProceedModal";
import SuccessfullyModal from "../../../PopupModal/SuccessfullyModal";
import DisbursedModal from "../../../PopupModal/DisbursedModal";
import { fetchApplicationList } from "../../../../Config/FetchListingData.jsx";

function CommodityList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { proceedModal = false } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
  const { disbursedModal = false } = PopupReducer?.modal;
  const commodityType = PopupReducer?.modal?.type; // COMIDITYAGENT

  // const [arrList, setArrList] = useState([
  //   {
  //     app_name: "220872-00",
  //     name_as_per_passport:'Craig Stanton',

  //   },
  //   {
  //     app_name: "220873-00",
  //     name_as_per_passport:'Alfredo Passaquindici Arcand',
  //   },
  //   {
  //     app_name: "220874-00",
  //     name_as_per_passport:'Omar Ekstrom Bothman',
  //   },
  //   {
  //     app_name: "220875-00",
  //     name_as_per_passport:'Cooper Calzoni',
  //   },
  //   {
  //     app_name: "220876-00",
  //     name_as_per_passport:'Jaydon Dias',
  //   },
  //   {
  //     app_name: "220877-00",
  //     name_as_per_passport:'Phillip Korsgaard',
  //   },
  //   {
  //     app_name: "220878-00",
  //     name_as_per_passport:'Alfonso Stanton',
  //   },
  //   {
  //     app_name: "220879-00",
  //     name_as_per_passport:'Craig Geidt',
  //   },

  //   {
  //     app_name: "220880-00",
  //     name_as_per_passport:'Phillip Bergson',
  //   },
  // ]);

  // navigate to agreement
  const navigateToAgreement = (e) => {
    e.preventDefault();
    // dispatch(SetpopupReducerData({ modalType: "PROCEED", proceedModal: true,type:'COMIDITYAGENT'}));
    if (selectedApplication?.length === 0) {
      alert("Please select application to proceed.");
      return;
    }
    dispatch(
      SetpopupReducerData({ modalType: "DISBURSED", disbursedModal: true })
    );
  };

  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    // pageNo: currentPage,
    // limit: perPage,
    startDate: "",
    endDate: "",
    periodFrom: "",
  });

  const handleFilterChange = (e) => {
    setFilterKey({ ...filterKey, [e.target.name]: e.target.value, pageNo: 1 });
  };
  const handleChangeCheckBox = (e, id) => {
    let arr = [...selectedApplication];
    if (e.target.checked) {
      arr.push(id);
    } else {
      arr = arr.filter((ele) => ele !== id);
    }
    setSelectedApplication(arr);
  };
  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: "COMPLETED",
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
  }, [filterKey]);

  useEffect(() => {
    fetchListingData();
  }, [fetchListingData]);

  return (
    <>
      {proceedModal && <ProceedModal />}
      {successModal && <SuccessfullyModal />}
      {disbursedModal && <DisbursedModal />}

      <section className="">
        <div className="upload_new_application">
          <h3 className="card-title1 ps-4">
            {" "}
            {commodityType === "COMIDITYAGENT"
              ? "Commodity Trade Status"
              : "Funding and welcome letter issuance"}
          </h3>
          <div className="row ps-4">
            <div className="col-md-1 text-center pt-4">
              <img className="h-75px" src="../../images/success.png" />{" "}
            </div>
            <div className="col-md-7">
              <h2 className="card-title">Completed Commodity Trade</h2>
              <p className="card-text1">
                {commodityType === "COMIDITYAGENT"
                  ? "Commodity Trade has been completed and amount<br></br> depositing is in progress for following applications."
                  : "Funding to customer account in progress for following applications"}
              </p>
            </div>
            <div className="col-md-3">
              <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                <button
                  className="button px-4"
                  onClick={(e) => navigateToAgreement(e)}
                >
                  {commodityType === "COMIDITYAGENT"
                    ? "Proceed"
                    : "Proceed with welcome letter "}
                </button>
              </div>
            </div>
          </div>

          <div className="">
            <div className=" row my-5" id="table-contexual">
              <div className="col-12">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"> </th>
                      <th scope="col" className="ps-4">
                        S.No.{" "}
                      </th>
                      <th scope="col">Customer Name </th>
                      <th scope="col">Application no. </th>
                      <th scope="col">Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.map((item, index) => (
                      <tr className="pointer">
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id={item._id}
                              checked={selectedApplication?.includes(item?._id)}
                              onChange={(e) =>
                                handleChangeCheckBox(e, item._id)
                              }
                            />
                          </div>
                        </td>
                        <td className="ps-4">{index + 1}</td>
                        <td>{item?.name_as_per_passport}</td>
                        <td>{item?.serial_number}</td>

                        <td>
                          <span
                            className={
                              item?.showStatus === "Completed"
                                ? "green"
                                : "orange"
                            }
                          >
                            {item?.showStatus}
                          </span>
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

export default CommodityList;
