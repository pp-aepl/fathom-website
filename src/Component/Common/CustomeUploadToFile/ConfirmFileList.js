/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetloaderData, SetpopupReducerData } from "../../../store/reducer";

function ConfirmFileList({ setIsUploaded = () => {}, isUploaded = false }) {
  const dispatch = useDispatch();

  const { PopupReducer } = useSelector((state) => state);
  const { documents = [] } = PopupReducer?.modal;

  const handleDelete = (idx) => {
    dispatch(SetloaderData(false));
    let arr = [...documents];
    arr.splice(idx, 1);
    dispatch(
      SetpopupReducerData({
        ...PopupReducer?.modal,
        documents: [...arr],
      })
    );
  };
  useEffect(() => {
    if (documents?.length === 0) {
      setIsUploaded(false);
    }
  }, [documents]);

  return (
    <>
      {/* Uploaded/duplicate  files */}
      {/* {fileType === "FILEUPLOADED" && (
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="label" for="flexCheckDefault">
            Select All
          </label>
        </div>

        
      )} */}

      {documents?.length > 0
        ? documents?.map((ele, index) => (
            <div className="row pb-4" key={index}>
              <div className="col-md-2 text-end">
                <a
                  href={
                    typeof ele?.document === "string" ? `${ele?.document}` : "#"
                  }
                  target="_blank"
                >
                  <img
                    src="../../images/notepad.png"
                    className="w-75 d-inline-block"
                  ></img>
                </a>
              </div>

              <div class="col-sm-8">
                <div class=" align-items-center p-1">
                  <p className="card-text1 fw-bold">{ele.name}</p>
                  {isUploaded || typeof ele?.document === "string" ? (
                    <span className="text-success card-text1 fw-bold">
                      UPLOADED
                    </span>
                  ) : (
                    <div class="progress bar-wrapper w-100 h-5px">
                      <div
                        class="progress-bar skill-bar desh_progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="col-md-2 pt-2"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDelete(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                </svg>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default ConfirmFileList;
