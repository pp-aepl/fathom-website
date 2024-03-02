import React, { useState } from "react";
import MurabahaModal from "./MurabahaModal";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";

function MurabahaList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer } = useSelector((state) => state);
  const { murabahaModal = false } = PopupReducer?.modal;
  const [arrList, setArrList] = useState([
    {
      app_name: "220872-00",
      name: "Nolan Levin",
      email:"nolan@gmail.com"
    },
    {
      app_name: "220873-00",
      name: "Aaeesha Mohamed ",
      channel: true
    },
    {
      app_name: "220874-00",
      name: "Jaydon Calzoni",
      email:"jaydon@yahoo.com"
    },
    {
      app_name: "220875-00",
      name: "Maadhav Nazar ",
      channel: true
    },
    {
      app_name: "220876-00",
      name: "Emerson Vetrovs",
      email:"emerson@gmail.com"

    },
    {
      app_name: "220877-00",
      name: "Haajar Rahman",
      channel: true
    },
    {
      app_name: "220878-00",
      name: "Marcus Lipshutz",
      email:"marcus@yahoo.com"
    },
    {
      app_name: "220879-00",
      name: "Zaire Culhane",
      channel: true
    },
    {
      app_name: "220880-00",
      name: "Saadiq Yousuf ",
      email:"saadiq@gmail.com"
    },
  ]);



    // navigate to agreement
    const navigateToAgreement = () =>{
        navigate("/admin/application/sent");
      }


  return (
    <>
      {murabahaModal && <MurabahaModal />}

      <section className="">
       
          <div className="upload_new_application px-4">
            <h3>Upload New Application </h3>
            {!murabahaModal && 
            <>
              <div className="top_list">
              <p>
                Murabaha Agreement would be sent to following recipient. Do you
                want to continue?
              </p>
              <div className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}>
                <button style={{ width: "274px" ,marginRight:"9px"}}>No</button> 
                <button style={{ width: "274px" }} onClick={() => navigateToAgreement()}>Yes</button>
              </div>

              <div className="row pt-4">
                <div className="col-md-2">
                  <label>Filter</label>
                  <select class="form-select ">
                    <option value={""}>All</option>
                    <option value={"APPROVE"}>Approve and Proceed</option>
                    <option value={"PROCEED&EXCEPTION"}>
                      Proceed with exception
                    </option>
                    <option value={"REJECTED"}>
                      Reject & Send back for correction
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
                        <th scope="col">CRN#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Channel</th>
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
                        
                        <td>{item?.app_name}</td>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        {item?.channel && <td> <span className="channel_border">Send back to Tele sales</span></td> }
                        
                        
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
       
      </section>
    </>
  );
}

export default MurabahaList;
