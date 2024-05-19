import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

function Filter({ filterKey, setFilterKey, hideSearch = false }) {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  const handleChangePeriod = (e) => {
    const val = e.target.value;
    let date = new Date(); // Current date

    if (val === "day") {
      date.setDate(date.getDate() - 1);
    } else if (val === "week") {
      date.setDate(date.getDate() - 7);
    } else if (val === "month") {
      date.setMonth(date.getMonth() - 1);
    } else if (val === "") {
      date = "";
    }

    if (date) {
      date = date?.toISOString().split("T")[0] + "T00:00:00";
    }

    setFilterKey({ ...filterKey, periodFrom: date, period: val });
    setDateFrom("");
    setDateTo("");
  };
  const handleChangeDate = (e) => {
    let { name, value } = e;
    if (value) {
      let date =
        name === "startDate"
          ? moment(value).startOf("day").valueOf()
          : moment(value).endOf("day").valueOf();
      date = new Date(date);
      value = date;
    }
    setFilterKey({ ...filterKey, [name]: value, period: "" });
  };
  return (
    <>
      <div className={`${hideSearch ? "col-md-4" : "col-md-3"} px-4`}>
        <label className="label">Filter</label>
        <select
          className="form-select p-3"
          name="period"
          // value={filterKey?.period}
          onChange={handleChangePeriod}
        >
          <option value={""}>Select</option>
          <option value="day">Last day</option>
          <option value="week">Last week</option>
          <option value="month">Last month</option>
        </select>
      </div>
      {hideSearch ? (
        ""
      ) : (
        <div className="col-3">
          <label className="label">Search Applications</label>
          <div className="form-group has-search">
            {/* <span className="fa fa-search form-control-feedback"></span> */}
            <input
              type="text"
              className="form-control p-3"
              name="serial_number"
              value={filterKey.serial_number}
              inputMode="numeric"
              placeholder="Search..."
              onChange={(e) =>
                setFilterKey({
                  ...filterKey,
                  serial_number: e.target.value,
                })
              }
            />
          </div>
        </div>
      )}
      <div className={`${hideSearch ? "col-md-4" : "col-md-3"} px-4`}>
        <label className="label">Date from</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={dateFrom}
          onChange={(date) => {
            let event = { name: "startDate", value: date };
            handleChangeDate(event);
            setDateFrom(date);
          }}
          className="form-control p-3"
          isClearable={dateFrom}
          placeholderText="Select start date"
          maxDate={new Date()}
        />
      </div>
      <div className={`${hideSearch ? "col-md-4" : "col-md-3"} px-4`}>
        <label className="label">Date to</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          minDate={dateFrom}
          maxDate={new Date()}
          selected={dateTo}
          onChange={(date) => {
            let event = { name: "endDate", value: date };
            handleChangeDate(event);
            setDateTo(date);
          }}
          className="form-control p-3"
          isClearable={dateTo}
          placeholderText="Select end date"
        />
      </div>
    </>
  );
}

export default Filter;
