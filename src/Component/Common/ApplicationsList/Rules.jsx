/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function Rules() {
  const { ConfigData } = useSelector((state) => state);
  return (
    <>
      {" "}
      {ConfigData?.rules?.length > 0 ? (
        ConfigData?.rules?.map((ele, index, arr) => (
          <>
            <div
              className="list_row d-flex justify-content-between"
              key={ele._id}
            >
              <div>
                <strong>RULE {index + 1}: </strong>
                {ele?.rule_name}
              </div>
              <div className="icon" style={{ maxHeight: "25px" }}>
                {`${index + 1}/${arr.length}`}
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="text-center">
          <Spinner className="" />
        </div>
      )}
    </>
  );
}

export default memo(Rules);
