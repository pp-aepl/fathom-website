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
import { BASE_CONFIG } from "../../../../Config";

function InprocessList() {
  const APP_PLATFORM = BASE_CONFIG.APP_PLATFORM;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PopupReducer } = useSelector((state) => state);
  const { selectedApplication = [], status = "" } = PopupReducer?.modal;
  const [isCompleted, setIsCompleted] = useState(false);

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
        portal_id: BASE_CONFIG?.APP_PORTAL_ID
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setTimeout(() => {
          let nvUrl =
            APP_PLATFORM === "INTELLISCAN"
              ? "/admin/intelliscan-personal-finance-murbaha-details"
              : "/admin/application/list";
          navigate(nvUrl);
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
        setArrList([]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [filterKey]);

  useEffect(() => {
    fetchListingData();
  }, [fetchListingData]);
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
    }, 2000);
  }, []);

  return (
    <>
      <section className="px-2">
        <div className="upload_new_application inProcess py-4 pe-4">
          <h3 className="card-title1 ps-4">Application in process </h3>
          {!isCompleted && (
            <div className="top_list ps-4">
              <div className=" align-items-center p-1">
                <div className="progress common-progess bar-wrapper w-100">
                  <div
                    className="progress-bar skill-bar desh_progress-bar"
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
