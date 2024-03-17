/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetloaderData, SetpopupReducerData } from "../../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { apiURl } from "../../../../store/actions";
import { API } from "../../../../apiwrapper";

function InprocessList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { selectedApplication = [], status = "" } = PopupReducer?.modal;
 
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
  const navigateToAgreement = (item) => {
    navigate("/admin/application/murabaha");
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        selectedApplication: [item?._id],
        modalType: "MURABAHA",
        showModal: true,
      })
    );
  };

  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "AWAITING_COMMODITY_PURCHASE",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setTimeout(() => {
          navigate("/admin/application/list");
          dispatch(
            SetpopupReducerData({
              ...PopupReducer?.modal,
              modalType: "ProceedCommodity",
              showModal: true,
            })
          );
        }, 2000);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  useEffect(() => {
    if (selectedApplication?.length > 0) {
      handleProcess();
    }
  }, []);

  return (
    <>
      <section className="px-2">
        <div className="upload_new_application inProcess py-4 pe-4">
          <h3 className="card-title1 ps-4">Application in process </h3>
          <div className="top_list ps-4">
            <div class=" align-items-center p-1">
              <div class="progress common-progess bar-wrapper w-100">
                <div
                  class="progress-bar skill-bar desh_progress-bar"
                  role="progressbar"
                  aria-valuenow="76"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p className="card-text1 pt-4">10 of 30 Applications Done</p>
            </div>
          </div>

          <div className="">
            <div className="row my-5" id="table-contexual">
              <div className="col-12">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th className="ps-4" scope="col">
                        Application Name{" "}
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col pe-4">Rule 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrList?.map((item) => (
                      <tr
                        className="pointer"
                        onClick={() => navigateToAgreement(item)}
                      >
                        <td className="ps-4">{item?.app_name}</td>
                        <td>
                          <span
                            className={
                              item?.status === "Done" ? "green" : "orange"
                            }
                          >
                            {item?.status}
                          </span>
                        </td>
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
    </>
  );
}

export default InprocessList;
