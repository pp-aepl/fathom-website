import React from "react";

function UploadToFile() {
  return (
    <div className="card uploadFile">
      <img
        className="card-img-top"
        src="../../images/upload-image-icon-png-10.jpg"
        alt="Card image cap"
        style={{ width: "100px", height: "100px" }}
      ></img>
      <div className="card-body">
        <h3 className="card-title">Import File</h3>
        <p className="card-text">
          File should be larger then 5MB.File supporting PDF.
        </p>
      </div>
    </div>
  );
}

export default UploadToFile;
