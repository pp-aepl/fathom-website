import React from "react";
import DatePicker from "react-datepicker";

function Filter({ filterKey, setFilterKey }) {
  const handleChangePeriod = (e) => {
    const val = e.target.value;
    let date = new Date(); // Current date

    if (val === "day") {
      date.setDate(date.getDate() - 1); // Subtract 1 day
    } else if (val === "week") {
      date.setDate(date.getDate() - 7); // Subtract 7 days (1 week)
    } else if (val === "month") {
      date.setMonth(date.getMonth() - 1); // Subtract 1 month
    } else if (val === "") {
      date = "";
    }
    setFilterKey({ ...filterKey, periodFrom: date, pageNo: 1 });
  };

  return (
    <>
      <div className="col-md-3 px-4">
        <label className="label">Filter</label>
        <select
          class="form-select p-3"
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
      <div className="col-3 ">
        <label className="label">Date from</label>
        <DatePicker
          selected={filterKey.startDate}
          onChange={(date) => {
            setFilterKey({
              ...filterKey,
              startDate: date,
            });
          }}
          className="form-control p-3"
          isClearable={filterKey.startDate}
          placeholderText="Select start date"
        />
      </div>
      <div className="col-3 ">
        <label className="label">Date to</label>
        <DatePicker
          minDate={filterKey.startDate}
          maxDate={new Date()}
          selected={filterKey.endDate}
          onChange={(date) => {
            setFilterKey({
              ...filterKey,
              endDate: date,
            });
          }}
          className="form-control p-3"
          isClearable={filterKey.endDate}
          placeholderText="Select end date"
        />
      </div>
    </>
  );
}

export default Filter;
