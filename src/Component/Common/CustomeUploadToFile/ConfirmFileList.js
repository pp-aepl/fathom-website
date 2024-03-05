import React from "react";
import { useSelector } from "react-redux";

function ConfirmFileList() {
  const { PopupReducer } = useSelector((state) => state);
  const fileType = PopupReducer?.modal?.type;
  console.log({ fileType });

  return (
    <>
      {/* Uploaded/duplicate  files */}
      {fileType === "FILEUPLOADED" && (
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
      )}

      <div className="row">
        <div className="col-md-1 pt-2">
          {fileType === "FILEUPLOADED" ?(
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>
          ) : 
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-file-text"
          viewBox="0 0 16 16"
        >
          <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
        </svg>
          }

       
        </div>

        <div class="col-sm-9 pb-3">
          <div class=" align-items-center p-1">
            <p style={{ fontWeight: "bold" }}>CRN - 22233</p>
            {fileType === "FILEUPLOADED" ? (
              <span style={{ color: "green", fontWeight: "600" }}>
                UPLOADED
              </span>
             ) :  
             <div class="progress bar-wrapper w-100 h-5px">
             <div
               class="progress-bar skill-bar desh_progress-bar"
               role="progressbar"
               aria-valuenow="76"
               aria-valuemin="0"
               aria-valuemax="100"
             ></div>
           </div>}
           
          </div>
        </div>
        <div className="col-md-2 pt-2" style={{ color: "red" }}>
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
      <div className="row">
        <div className="col-md-1 pt-2">
          {fileType === "FILEUPLOADED" ?(
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>
          ) : 
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-file-text"
          viewBox="0 0 16 16"
        >
          <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
        </svg>
          }

       
        </div>

        <div class="col-sm-9 pb-3">
          <div class=" align-items-center p-1">
            <p style={{ fontWeight: "bold" }}>CRN - 22234</p>
            {fileType === "FILEUPLOADED" ? (
              <span style={{ color: "green", fontWeight: "600" }}>
                UPLOADED
              </span>
             ) :  
             <div class="progress bar-wrapper w-100 h-5px">
             <div
               class="progress-bar skill-bar desh_progress-bar"
               role="progressbar"
               aria-valuenow="76"
               aria-valuemin="0"
               aria-valuemax="100"
             ></div>
           </div>}
           
          </div>
        </div>
        <div className="col-md-2 pt-2" style={{ color: "red" }}>
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
      <div className="row">
        <div className="col-md-1 pt-2">
          {fileType === "FILEUPLOADED" ?(
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>
          ) : 
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-file-text"
          viewBox="0 0 16 16"
        >
          <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
        </svg>
          }

       
        </div>

        <div class="col-sm-9 pb-3">
          <div class=" align-items-center p-1">
            <p style={{ fontWeight: "bold" }}>CRN - 22235</p>
            {fileType === "FILEUPLOADED" ? (
              <span style={{ color: "green", fontWeight: "600" }}>
                UPLOADED
              </span>
             ) :  
             <div class="progress bar-wrapper w-100 h-5px">
             <div
               class="progress-bar skill-bar desh_progress-bar"
               role="progressbar"
               aria-valuenow="76"
               aria-valuemin="0"
               aria-valuemax="100"
             ></div>
           </div>}
           
          </div>
        </div>
        <div className="col-md-2 pt-2" style={{ color: "red" }}>
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
     
    </>
  );
}

export default ConfirmFileList;
