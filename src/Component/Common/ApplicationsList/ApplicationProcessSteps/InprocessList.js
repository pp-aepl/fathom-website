/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetloaderData, SetpopupReducerData } from "../../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { apiURl } from "../../../../store/actions";
import { API } from "../../../../apiwrapper";
import { fetchApplicationList } from "../../../../Config/FetchListingData";
import ListingWithRule from "../ListingWithRule";

function InprocessList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { selectedApplication = [], status = "" } = PopupReducer?.modal;
  const [isCompleted, setIsCompleted] = useState(false);
  const [dummyArr, setDummyList] = useState([
    {
      serial_number: "220872-00",
      status: "Done",
    },
    {
      serial_number: "220873-00",
      status: "In Progress",
    },
    {
      serial_number: "220874-00",
      status: "Done",
    },
    {
      serial_number: "220875-00",
      status: "Done",
    },
    {
      serial_number: "220876-00",
      status: "In Progress",
    },
    {
      serial_number: "220877-00",
      status: "In Progress",
    },
    {
      serial_number: "220878-00",
      status: "In Progress",
    },
    {
      serial_number: "220879-00",
      status: "Done",
    },
    {
      serial_number: "220880-00",
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
        status: "PROCESSING_COMMODITY_PURCHASE",
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
    // if (selectedApplication?.length > 0) {
    //   handleProcess();
    // }
    setTimeout(() => {
      dispatch(
        SetpopupReducerData({
          ...PopupReducer?.modal,
          modalType: "ProceedCommodity",
          showModal: true,
        })
      );
      setIsCompleted(true);
    }, 5000);
  }, []);

  const [arrList, setArrList] = useState([]);

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

  const fetchListingData = useCallback(async () => {
    try {
      let payload = { status: "PROCESSING_COMMODITY_PURCHASE", ...filterKey };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data);
        setArrList(data?.results);
      } else {
        setArrList(dummyArr);
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
      <section className="px-2">
        <div className="upload_new_application inProcess py-4 pe-4">
          <h3 className="card-title1 ps-4">Application in process </h3>
          {!isCompleted && (
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
          )}
          <ListingWithRule
            selectedApplication={selectedApplication}
            listingData={arrList}
            // handleChangeCheckBox={handleChangeCheckBox}
            inProcess={true}
          />
        </div>
      </section>
    </>
  );
}

export default InprocessList;
