/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useDispatch } from "react-redux";
import { SetpopupReducerData } from "../../../store/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function CommonHeader() {
  const dispatch = useDispatch();
  let location = useLocation();
  let path = location?.pathname?.split("/");
  let last_Path = path[path?.length - 1];
  const navigate = useNavigate();
  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(
      SetpopupReducerData({
        modalType: "UPLOAD_FILE",
        showModal: true,
      })
    );
    navigate("/admin/application/upload");
  };
  const handleExport = () => {
    let table = document.getElementById("exportTable");
    var doc = new jsPDF();
    if (table) {
      doc.autoTable({
        html: table,

        didDrawCell: (data) => {
          // Check if the cell content contains an <img> tag
          if (data.cell && data.cell.raw && data.cell.raw.nodeName === "IMG") {
            const img = new Image();
            img.src = data.cell.raw.src;
            const altText = data.cell.raw.alt || ''; // Extract alt attribute value
            const imgData = data.cell.raw.src;
            const aspectRatio = img.width / img.height;
            const imgWidth = 20; // Adjust the image width as needed
            const imgHeight = imgWidth / aspectRatio;
            const xPos = data.cell.x + (data.cell.width / 2) - (imgWidth / 2);
            const yPos = data.cell.y + 2; // Adjust the vertical position as needed
            doc.addImage(imgData, "JPEG", xPos, yPos, imgWidth, imgHeight);
            // Add alt text below the image
            doc.setFontSize(8);
            doc.text(xPos, yPos + imgHeight + 3, altText);
        }
        },
      });
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      doc.setFontSize(10);
      doc.text(formattedDate, 10, doc.internal.pageSize.height - 10);
      doc.save(`${last_Path}_applications_${formattedDate}.pdf`);
    } else {
      console.error("Table element not found.");
    }
  };
  useEffect(() => {
    console.log(last_Path, "last_Path");
  }, [last_Path]);
  return (
    <div className="commonHeader d-flex justify-content-between">
      <h1>
        {path?.includes("dashboard") ? "Dashboard - Smart Onboard 360" : ""}
      </h1>

      <div className="right-side">
        <div className="border px-2 p-1 rounded-2 d-inline-block me-3 notification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"></path>
          </svg>
        </div>
        {last_Path === "disbursal" ||
        last_Path === "error" ||
        last_Path === "list" ? (
          <div
            className="upload d-inline-block border rounded-2 py-1 px-3 cursar-pointer"
            onClick={handleExport}
          >
            <img
              src="../../../images/upload_icon.svg"
              className="d-inline-block me-2"
            ></img>
            <span className="d-inline-block">Export</span>
          </div>
        ) : (
          <div
            className="upload d-inline-block border rounded-2 py-1 px-3 cursar-pointer"
            onClick={handleUpload}
          >
            <img
              src="../../../images/upload_icon.svg"
              className="d-inline-block me-2"
            ></img>
            <span className="d-inline-block">Upload</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommonHeader;
