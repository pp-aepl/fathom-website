import React, { useState } from "react";
import MurabahaModal from "./MurabahaModal";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";
import MurabahaGenratedModal from "./MurabahaGenratedModal";
import ProceedModal from "../../../PopupModal/ProceedModal";
import MurabahaSuccessfully from "./MurabahaSuccessfully";

function MurabahaList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer } = useSelector((state) => state);
  const { murabahaModal = false } = PopupReducer?.modal;
  const { genratedModal = false } = PopupReducer?.modal;
  const { proceedModal = false } = PopupReducer?.modal;
  const { murabahaSuccessModal = false } = PopupReducer?.modal;

  const [arrList, setArrList] = useState([
    {
      date:new Date(),
      app_name: "220872-00",
      name: "Nolan Levin",
      email:"nolan@gmail.com"
    },
    {
      date:new Date(),
      app_name: "220873-00",
      name: "Aaeesha Mohamed ",
      channel: true
    },
    {
      app_name: "220874-00",
      name: "Jaydon Calzoni",
      email:"jaydon@yahoo.com",
      date:new Date()
    },
    {
      app_name: "220875-00",
      name: "Maadhav Nazar ",
      channel: true,
      date:new Date()
    },
    {
      app_name: "220876-00",
      name: "Emerson Vetrovs",
      email:"emerson@gmail.com",
      date:new Date()

    },
    {
      app_name: "220877-00",
      name: "Haajar Rahman",
      channel: true,
      date:new Date()
    },
    {
      app_name: "220878-00",
      name: "Marcus Lipshutz",
      email:"marcus@yahoo.com",
      date:new Date()
    },
    {
      app_name: "220879-00",
      name: "Zaire Culhane",
      channel: true,
      date:new Date()
    },
    {
      app_name: "220880-00",
      name: "Saadiq Yousuf ",
      email:"saadiq@gmail.com",
      date:new Date()
    },
  ]);



    // navigate to agreement
    const navigateToAgreement = () =>{
        // navigate("/admin/application/sent");
        dispatch(
          SetpopupReducerData({ modalType: "MURABAHASUCCESS", murabahaSuccessModal: true })
        );
      }


  return (
    <>
      {murabahaModal && <MurabahaModal />}
      {genratedModal && <MurabahaGenratedModal/>}
      {proceedModal && <ProceedModal />}
      {murabahaSuccessModal && <MurabahaSuccessfully />}
      
      <section className="">
        <div className="container">
          <div className="voucherFormMain upload_new_application">
            <h3>Murabaha Agreement</h3>
            {!murabahaModal && !genratedModal && 
            <>
              <div className="top_list">
              <p>
               Murabaha Agreement would be sent to following recipient. 
              </p>
              <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                {/* <button style={{ width: "274px" ,marginRight:"9px"}}>No</button>  */}
                <button style={{ width: "274px" }} onClick={() => navigateToAgreement()}>Proceed</button>
              </div>

              <div className="row pt-4">
                <div className="col-md-2">
                  <label>Filter</label>
                  <select class="form-select ">
                    <option value={""}>All</option>
                    <option value={"EMAIL"}>Email</option>
                    <option value={"CHANNEL"}>
                      channel
                    </option>
                   
                  </select>
                </div>
                <div className="col-3 ">
                  <span>Search Applictaion</span>
                  <input placeholder="Search" className="form-control" />
                </div>
                <div className="col-2">
                  <span>Date from</span>
                  <div className="  text-right">
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
              </div>
            </div>

            <div className="">
              <div className=" row my-5" id="table-contexual">
                <div className="col-12">
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col"> </th>
                        <th scope="col">Date</th>
                        <th scope="col">Application no.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email/Channel</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {arrList?.map((item) => (  
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
                        
                        <td>{item?.date.toLocaleDateString()}</td>
                        <td>{item?.app_name}</td>
                        <td>{item?.name}</td>
                       
                        {item?.channel ? <td> <span className="channel_border">Send back to Tele sales</span></td> :  <td>{item?.email}</td> }
                        <td >View</td>
                        
                        
                      </tr>
                     ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </>
            }
          
          </div>
        </div>
      </section>
    </>
  );
}

export default MurabahaList;
