/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaChevronRight,
  FaXmark,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Sidebar() {
  // console.log(Style)
  const [showActive, setShowActive] = useState(-1);
  const [openDropdown, setOpenDropdown] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(-1);
      setShowActive(-1);
    } else {
      setOpenDropdown(index);
      setShowActive(index);
    }
  };

  return (
    <>
      {/* <div className="header__toggle">
        <i
          className={`${"respMenu"} ${showMenu ? "active" : ""}`}
          id="header-toggle"
        >
          <FaChevronRight />
        </i>
      </div> */}
      <div className={`${"nav_2"} ${showMenu ? "active" : ""}`} id={"navbar"}>
        {/* <button className={"toggleClose"}>
          <FaXmark />
        </button> */}
        <nav className={"nav__container"}>
          <div onMouseLeave={() => setOpenDropdown(-1)}>
            <div className={"nav__list"}>
              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link to="/admin/dashboard" className={"nav__link"}>
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img
                      alt="logo"
                      src="../../../images/fathom_logo.png"
                      class="header_logo"
                    ></img>
                  </div>
                  <span className="logo-content">Fathom</span>
                </Link>
              </div>

              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link to="/admin/dashboard" className={"nav__link"}>
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img src="../../../images/dashboard_icon.svg" alt="" />
                  </div>
                  <span className={"nav__name"}>Dashboard</span>
                </Link>
              </div>

              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link className={"nav__link"} to="/admin/application/status">
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img src="../../../images/application_icon.svg" alt="" />
                  </div>
                  <span className={"nav__name"}>Application status</span>
                </Link>
              </div>
              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link className={"nav__link"} to="/admin/application/upload">
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.25" stroke="#151517" stroke-width="1.5"/>
                  </svg>
                  </div>
                  <span className={"nav__name"}>Ready to be import</span>
                </Link>
              </div>

              <div className={"nav__items"}>
                <div
                  className={`${"nav__dropdown"} ${
                    openDropdown === 1 ? "open" : ""
                  }  `}
                >
                  <a
                    to="#"
                    className={"nav__link"}
                    onClick={() => toggleDropdown(1)}
                  >
                    <div
                      className={` ${"icon_cmn"} ${"bx_home"} ${"nav__icon"}`}
                    >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.25" stroke="#151517" stroke-width="1.5"/>
                  </svg>
                    </div>
                    <span className={"nav__name"}>Under Process</span>
                    <i
                      className={` ${"ms_auto"} ${"bx_chevron_down"} ${"nav__icon"} ${
                        openDropdown === 1 ? "open" : ""
                      } `}
                    >
                      <FaAngleDown />
                    </i>
                  </a>
                  <div
                    className={`${"nav__dropdown_collapse"} ${
                      openDropdown === 1 ? "open" : ""
                    }`}
                  >
                    <div className={"nav__dropdown_content"}>
                      <Link
                        to="/admin/application/list"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Awaiting Commodity Purchase
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/sent"
                        className={`${"nav__dropdown_item multiline"} d-flex justify-content-between align-items-center`}
                      >
                        Digital: Awaiting Customer acceptance on <br></br>the Agreement
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/sent"
                        className={`${"nav__dropdown_item multiline"} d-flex justify-content-between align-items-center`}
                      >
                        Physical – Awaiting Customer acceptance on<br></br> the Agreement
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/sent"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Awaiting Agent Appointment and Response.
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/commodity"
                        className={`${"nav__dropdown_item multiline"} d-flex justify-content-between align-items-center`}
                      >
                        Awaiting funding and Welcome <br></br>letter issuance
                        <FaAngleRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link className={"nav__link"} to="/admin/application/completed">
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.25" stroke="#151517" stroke-width="1.5"/>
                  </svg>
                  </div>
                  <span className={"nav__name"}>
                    Completed – Welcome Letter issued
                  </span>
                </Link>
              </div>

              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link className={"nav__link"} to="/admin/application/rejected">
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.25" stroke="#151517" stroke-width="1.5"/>
                  </svg>
                  </div>
                  <span className={"nav__name"}>
                    Rejected - Pending Channel correction
                  </span>
                </Link>
              </div>

              {/* <div className={"nav__items"}>
                <Link to="/admin/dashboard/sponser" className={"nav__link"}>
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img src="../../../images/task-square.svg" alt="" />
                  </div>
                  <span className={"nav__name"}>Reports</span>
                </Link>
              </div> */}



              <div className={"nav__items"}>
                <div
                  className={`${"nav__dropdown"} ${
                    openDropdown === 1 ? "open" : ""
                  }  `}
                >
                  <a
                    to="#"
                    className={"nav__link"}
                    onClick={() => toggleDropdown(1)}
                  >
                    <div
                      className={` ${"icon_cmn"} ${"bx_home"} ${"nav__icon"}`}
                    >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.25" stroke="#151517" stroke-width="1.5"/>
                  </svg>
                    </div>
                    <span className={"nav__name"}>Reports</span>
                    <i
                      className={` ${"ms_auto"} ${"bx_chevron_down"} ${"nav__icon"} ${
                        openDropdown === 1 ? "open" : ""
                      } `}
                    >
                      <FaAngleDown />
                    </i>
                  </a>
                  <div
                    className={`${"nav__dropdown_collapse"} ${
                      openDropdown === 1 ? "open" : ""
                    }`}
                  >
                    <div className={"nav__dropdown_content"}>
                      <Link
                        to="/admin/reports/disbursal"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Disbursal Report
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/reports/error"
                        className={`${"nav__dropdown_item multiline"} d-flex justify-content-between align-items-center`}
                      >
                       Pending / Error
                        <FaAngleRight />
                      </Link>
                     
                    </div>
                  </div>
                </div>
              </div>





            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
