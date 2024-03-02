import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../../store/reducer";
import ProceedModal from "../../../PopupModal/ProceedModal";
import SuccessfullyModal from "../../../PopupModal/SuccessfullyModal";
import DisbursedModal from "../../../PopupModal/DisbursedModal";

function CommodityList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { proceedModal = false } = PopupReducer?.modal;
  const { successModal = false } = PopupReducer?.modal;
  const { disbursedModal = false } = PopupReducer?.modal;

  const [arrList, setArrList] = useState([
    {
      app_name: "220872-00",
    },
    {
      app_name: "220873-00",
    },
    {
      app_name: "220874-00",
    },
    {
      app_name: "220875-00",
    },
    {
      app_name: "220876-00",
    },
    {
      app_name: "220877-00",
    },
    {
      app_name: "220878-00",
    },
    {
      app_name: "220879-00",
    },
    {
      app_name: "220880-00",
    },
  ]);

  // navigate to agreement
  const navigateToAgreement = (item) => {
    dispatch(SetpopupReducerData({ modalType: "PROCEED", proceedModal: true,type:'COMIDITYAGENT'}));
  };

  return (
    <>
      {proceedModal && <ProceedModal />}
      {successModal && <SuccessfullyModal />}
      {disbursedModal && <DisbursedModal />}


      <section className=""> 
          <div className="upload_new_application">
            <h3>Commodity Trade Status</h3>
            <div className="row col-md-12">
              <div className="col-md-1">
                <img src="../../images/icon2.png" style={{ height: "74px" }} />{" "}
              </div>
              <div className="col-md-7">
                <h2>Completed Commodity Trade</h2>
                <p>
                  Commodity Trade has been completed and amount depositing is in
                  progress for following applications.
                </p>
              </div>
              <div className="col-md-3">
                <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                  <button
                    style={{ width: "278px" }}
                    onClick={() => navigateToAgreement()}
                  >
                    Send to core banking system
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <div className=" row my-5" id="table-contexual">
                <div className="col-12">
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">S.No. </th>
                        <th scope="col">Application </th>
                        <th scope="col">CRN </th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrList?.map((item, index) => (
                        <tr
                          className="pointer"
                          onClick={() => navigateToAgreement(item)}
                        >
                          <td>{index + 1}</td>
                          <td>Application name</td>
                          <td>{item?.app_name}</td>
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
