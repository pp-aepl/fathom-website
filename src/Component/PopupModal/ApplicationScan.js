/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../store/reducer";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../../Config/CircleChart";
function ApplicationScan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { PopupReducer } = useSelector((state) => state);
  const { showModal } = PopupReducer?.modal;

  const [statusType, setStatusType] = useState({
    success: "",
    failed: "",
    default: "DEFAULT",
  });

  const handleClosePopup = () => {
    dispatch(reSetPopupReducerData());
  };
  const chartData1 = {
    options: {
      chart: {
        height: 200,
        type: "radialBar",
      },
      series: [100],
      colors: ["#04275b"],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "20px",
            show: true,
            offsetY: 70,
            formatter: function (val) {
              return val||100;
            },
          },
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "#85b2f5",
          type: "horizontal",
          gradientToColors: ["#357fed", "#739aff"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "butt",
      },
      labels: ["Completed"],
    },
  };
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(SetpopupReducerData({ modalType: "APP_SCAN", showModal: true }));
    let data = { ...statusType };
    data.success = "SUCCESS";
    setStatusType(data);
    console.log(statusType);
  };
  const navigateToList = async (e, typeSubmit) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        modalType: "APP_SCAN",
        showModal: false,
      })
    );
    // navigate("/admin/application/list");
    setTimeout(() => {
      dispatch(
        SetpopupReducerData({
          ...PopupReducer?.modal,
          modalType: "FILESCONFIRM",
          showConfirmModal: true,
        })
      );
    }, 200);
  };
  useEffect(() => {
    setTimeout(() => {
      setStatusType({
        success: "SUCCESS",
        failed: "",
        default: "DEFAULT",
      });
    }, 5000);
  }, []);
  return (
    <>
      <Modal
        className={"publishModal"}
        show={showModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
        style={{ backdropFilter: "blur(5px)" }}
      >
        {statusType?.success !== "SUCCESS" && (
          <Modal.Header closeButton onClick={onSubmit}></Modal.Header>
        )}

        <Modal.Body className="full-cover">
          <div className="text-center">
            {statusType?.success !== "SUCCESS" && (
              <>
                {/* <div className="row">
              <div className="col-md-12 text-center">
                <div className="progressChart yellow">
                  <span className="progressChart-left">
                    <span className="progressChart-bar"></span>
                  </span>
                  <span className="progressChart-right">
                    <span className="progressChart-bar"></span>
                  </span>
                  <div className="progressChart-value">75%</div>
                </div>
              </div>
            </div> */}
                <ChartComponent chartData={chartData1} />
              </>
            )}

            {statusType?.success === "SUCCESS" && (
              <img src="../../images/success.png" style={{ height: "10vw" }} />
            )}
          </div>
          <div className="application_san">
            <h3 className="card-title text-center">
              Application scanning{" "}
              {statusType?.success === "SUCCESS" && "completed"}
            </h3>

            <p className="card-text text-center">
              {statusType?.success === "SUCCESS" &&
                "85 Application passed and 5 Application failed"}
              {statusType?.success !== "SUCCESS" &&
                "Application scanning is in process"}
            </p>
          </div>
          {statusType?.success === "SUCCESS" && (
            <div className={`px-5 mt-4`}>
              <button
                className="login100-form-btn"
                onClick={(e) => navigateToList(e, "new")}
              >
                Okay
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApplicationScan;
