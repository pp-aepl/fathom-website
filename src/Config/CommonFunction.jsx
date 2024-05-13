import jsPDF from "jspdf";

import {
  ReSetConfigData,
  logout,
  reSetPopupReducerData,
} from "../store/reducer";
var XLSX = require("xlsx");

export const convertToCamelCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const handleLogOut = (obj) => async (dispatch) => {
  try {
    dispatch(logout());
    dispatch(reSetPopupReducerData({}));
    dispatch(ReSetConfigData({}));
    localStorage.clear();
  } catch (error) {}
};

export const handleExportPdf = (id = "", name = "") => {
  let table = document.getElementById(id);
  var doc = new jsPDF();
  if (table) {
    doc.autoTable({
      html: table,

      didDrawCell: (data) => {
        // Check if the cell content contains an <img> tag
        if (data.cell && data.cell.raw && data.cell.raw.nodeName === "IMG") {
          const img = new Image();
          img.src = data.cell.raw.src;
          const altText = data.cell.raw.alt || ""; // Extract alt attribute value
          const imgData = data.cell.raw.src;
          const aspectRatio = img.width / img.height;
          const imgWidth = 20; // Adjust the image width as needed
          const imgHeight = imgWidth / aspectRatio;
          const xPos = data.cell.x + data.cell.width / 2 - imgWidth / 2;
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
    doc.save(`${name}_applications_${formattedDate}.pdf`);
  } else {
    console.error("Table element not found.");
  }
};

export const exportExcel = (id, filename) => {
  let table = document.getElementById(id);
  const ws = XLSX.utils.table_to_sheet(table);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}`);
};
