import Swal from "sweetalert2";
import Papa from "papaparse";
import { toast } from "react-toastify";

export const errorSweetAlert = (title, text, confirmBtnText, action,isCancelBtn) => {
  const customizedWarningSweetAlert = Swal.mixin({
    customClass: {
      header: "custom-sweet-alert-header",
      confirmButton: "btn custom-sweet-alert-warning-confirm-btn",
      container: "custom-sweet-alert-container",
      popup: "custom-sweet-alert-popup",
      actions: "custom-sweet-alert-actions",
      cancelButton: "btn custom-sweet-alert-warning-cancel-button",
      // cancelButton: 'btn custom-sweet-alert-warning-cancel-button'
    },
    buttonsStyling: false,
  });

  customizedWarningSweetAlert
    .fire({
      icon: isCancelBtn ? null : "error",
      title: title ? title : null,
      text: text ? text : null,
      showCancelButton: isCancelBtn ? isCancelBtn : false,
      confirmButtonText: confirmBtnText,
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (action !== undefined) {
          action();
        }
      }
    });
};

export const notifyMessage = (msg, type) => {
  if (type === 0) {
    toast.error(msg, {
      icon: true,
      hideProgressBar: false,
    });
  } else if (type === 1) {
    toast.success(msg, {
      icon: true,
      hideProgressBar: false,
    });
  } else if (type === 2) {
    toast.warning(msg, {
      icon: true,
      hideProgressBar: false,
    });
  } else if (type === 3) {
    toast.info(msg, {
      icon: true,
      hideProgressBar: false,
    });
  } else {
    toast.error(msg, {
      icon: true,
      hideProgressBar: false,
    });
  }
};

export const datetimeConverter = (date) => {
  const value = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return value.toLocaleString("en-US", options);
};

export const convertDates = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  1;
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const amPm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

  return `${formattedDate} ${formattedTime}`;
};

export const checkAMPM = (datetimeStr) => {
  const dt = new Date(datetimeStr);
  const hour = dt.getHours();
  if (hour < 12) {
    return "AM";
  } else {
    return "PM";
  }
};

export const exportCSVFile = (items, fileTitle) => {
  let csv = "";
  for (let i = 0; i < items.length; i++) {
    let line = "";
    for (let index in items[i]) {
      if (line !== "") line += ",";
      line += items[i][index];
    }
    csv += line + "\r\n";
  }
  let exportedFileName = fileTitle + ".csv";
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFileName);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export const downloadCSV = (data, columns, name) => {
  const csvData = [
    columns,
    ...data.map((row) => [
      row.shipmentNumber,
      row.shipmentReference,
      row.poNumber,
      row.date,
      row.companyName,
      row.status,
      row.driver,
      row.id,
      row.senderId,
      row.receiverId,
      row.shipmentDescription,
      row.temperatureRequirements,
      row.temperatureRequirementsCelsius,
      row.createdBy,
      row.dateFrom,
      row.dateTo,
      row.orgCode,
      row.address1,
      row.address2,
      row.UNLOCO,
      row.buildingName,
      row.country,
      row.contactNumber,
      row.contactName,
      row.contactEmail,
      row.routeId,
      row.routeName,
      row.driverName,
      row.comment,
      row.acceptedDate,
      row.completedDate,
      row.signatures,
      row.images,
    ]),
  ];

  const csv = Papa.unparse(csvData);

  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name ?? "Report"}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
