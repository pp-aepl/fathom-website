/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import moment from "moment";
import { getDashboardGraphData } from "../../Config/FetchListingData";
import { SetGraphData } from "../../store/reducer";

function Graph() {
  const dispatch = useDispatch();
  const { ConfigData } = useSelector((state) => state);
  const { graphData = {} } = ConfigData;
  const lineRef = useRef();
  const [filterGraph, setFilterGraph] = useState({
    month: moment().format("MMM"),
    year: moment().format("yyyy"),
  });
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //   const yearArr = [
  //     "2023",
  //     "2024",
  //     "2025",
  //     "2026",
  //     "2027",
  //     "2028",
  //     "2029",
  //     "2030",
  //   ];
  const options = {
    scales: {
      y: {
        type: "linear", // Define y-axis as linear scale
        position: "left", // Position y-axis on the left
        min: 0,
        // max: 100,
        ticks: {
          stepSize: 10, // Set step size to 10 units
        },
      },
    },
  };

  useEffect(() => {
    dispatch(getDashboardGraphData({ ...filterGraph }));
    return () => {
      dispatch(SetGraphData({}));
    };
  }, [filterGraph]);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className=" row col-md-12 pt-4">
            <div className="col-md-3">
              {/* 
              <select
                className="form-select"
                name="year"
                value={filterGraph.year}
                onChange={(e) =>
                  setFilterGraph({ ...filterGraph, year: e.target.value })
                }
              >
                <option value={""}>Select Year </option>
                {yearArr?.map((ele, index) => (
                  <option value={ele} key={index}>
                    {ele}
                  </option>
                ))}
              </select>
               */}
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="month"
                value={filterGraph.month}
                onChange={(e) =>
                  setFilterGraph({ ...filterGraph, month: e.target.value })
                }
              >
                <option value={""}>Select Month </option>
                {monthNames?.map((ele, index) => (
                  <option value={ele} key={index}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
            {Object.keys(graphData || {}).length > 0 ? (
              <Line
                data={graphData}
                ref={lineRef}
                // datasetIdKey={`${new Date()}`}
                options={options}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Graph);
