import React from "react";

function UploadToFile() {
  return (
    <div className="card uploadFile my-4">
      <img
        className="card-img-top"
        src="../../images/upload_btn.svg"
        alt="Card image cap"
        style={{ width: "60x", height: "60px" }}
      ></img>
      <div className="card-body">
        <h3 className="card-title fs-3">Import File</h3>
        <p className="card-text text-center">
          File should be larger then 5MB.File supporting PDF.
        </p>
      </div>
    </div>
  );
}

export default UploadToFile;
