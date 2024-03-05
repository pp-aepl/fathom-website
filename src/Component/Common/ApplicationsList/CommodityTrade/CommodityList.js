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
  const commodityType = PopupReducer?.modal?.type; // COMIDITYAGENT

console.log({commodityType})
  const [arrList, setArrList] = useState([
    {
      app_name: "220872-00",
      customer_name:'Craig Stanton',
      
    },
    {
      app_name: "220873-00",
      customer_name:'Alfredo Passaquindici Arcand',
    },
    {
      app_name: "220874-00",
      customer_name:'Omar Ekstrom Bothman',
    },
    {
      app_name: "220875-00",
      customer_name:'Cooper Calzoni',
    },
    {
      app_name: "220876-00",
      customer_name:'Jaydon Dias',
    },
    {
      app_name: "220877-00",
      customer_name:'Phillip Korsgaard',
    },
    {
      app_name: "220878-00",
      customer_name:'Alfonso Stanton',
    },
    {
      app_name: "220879-00",
      customer_name:'Craig Geidt',
    },

    {
      app_name: "220880-00",
      customer_name:'Phillip Bergson',
    },
  ]);

  // navigate to agreement
  const navigateToAgreement = (item) => {
    // dispatch(SetpopupReducerData({ modalType: "PROCEED", proceedModal: true,type:'COMIDITYAGENT'}));
     dispatch(
        SetpopupReducerData({ modalType: "DISBURSED", disbursedModal: true })
      );
  };

  return (
    <>
      {proceedModal && <ProceedModal />}
      {successModal && <SuccessfullyModal />}
      {disbursedModal && <DisbursedModal />}


      <section className="">
        
          <div className="upload_new_application">
            <h3 className="card-title1 ps-4"> {commodityType === 'COMIDITYAGENT' ? 'Commodity Trade Status' : 'Funding and welcome letter issuance'}</h3>
            <div className="row ps-4">
              <div className="col-md-1 text-center pt-4">
                <img className="h-75px" src="../../images/success.png"/>{" "}
              </div>
              <div className="col-md-7">
                <h2 className="card-title">Completed Commodity Trade</h2>
                <p className="card-text1">
                  {commodityType === 'COMIDITYAGENT' ? 'Commodity Trade has been completed and amount<br></br> depositing is in progress for following applications.' : 'Funding to customer account in progress for following applications' }
                </p>
              </div>
              <div className="col-md-3">
                <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                  <button className="button px-4" onClick={() => navigateToAgreement()}>
                    {commodityType === 'COMIDITYAGENT' ? 'Proceed' : 'Proceed with welcome letter '}
                    
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
                        <th scope="col" className="ps-4">S.No. </th>
                        <th scope="col">Customer Name </th>
                        <th scope="col">Application no. </th>
                        <th scope="col">Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrList?.map((item, index) => (
                        <tr
                          className="pointer"
                          onClick={() => navigateToAgreement(item)}
                        >
                          <td className="ps-4">{index + 1}</td>
                          <td>{item?.customer_name}</td>
                          <td>{item?.app_name}</td>
                          <td style={{color:'#29CC6A'}}>Completed</td>
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
