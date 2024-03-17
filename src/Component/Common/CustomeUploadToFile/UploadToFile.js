/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef } from "react";

function UploadToFile({ handleFileChange }) {
  const fileRef = useRef();

  const onFileChange = (e) => {
    const files = Array.from(e?.target?.files);
    const allFilesArePDF = files.every(
      (file) => file.type === "application/pdf"
    );
    if (!allFilesArePDF) {
      alert("Only PDF files are allowed.");
      return;
    }
    handleFileChange(e);
    setTimeout(() => {
      fileRef.current.value = "";
    }, 200);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.length > 0) {
      let event = { target: { files: e.dataTransfer.files } };
      onFileChange(event);
      e.dataTransfer.clearData();
    }
  };

  const handleOpenFile = () => {
    fileRef.current.click();
  };
  return (
    <div
      className="card uploadFile my-4"
      onClick={handleOpenFile}
      style={{ cursor: "pointer" }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img
        className="card-img-top"
        src="../../images/upload_btn.svg"
        alt="Card image cap"
        style={{ width: "60x", height: "60px" }}
      ></img>
      <div className="card-body">
        <h3 className="card-title fs-3">Import File</h3>
        <p className="card-text text-center">
          File should not be larger than 50 MB Supports PDF format.
        </p>
        <div>
          <input
            type="file"
            className="form-control form-control-sm"
            accept=".pdf"
            id="file"
            name="file"
            style={{ display: "none" }}
            multiple
            ref={fileRef}
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadToFile;
