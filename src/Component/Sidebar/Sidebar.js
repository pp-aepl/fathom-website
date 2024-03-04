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
      <div className="header__toggle" onClick={toggleMenu}>
        <i
          className={`${"respMenu"} ${showMenu ? "active" : ""}`}
          id="header-toggle"
        >
          <FaChevronRight />
        </i>
      </div>
      <div className={`${"nav_2"} ${showMenu ? "active" : ""}`} id={"navbar"}>
        <button className={"toggleClose"} onClick={toggleMenu}>
          <FaXmark />
        </button>
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
                  <span className={"nav__name"}>Fathom</span>
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
                    <img src="../../../images/upload_icon.svg" alt="" />
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
                      <img src="../../../images/refresh_icon.svg" alt="" />
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
                        to="/admin/application/waiting"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Awaiting Commodity Purchase
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/digital"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Digital: Awaiting Customer acceptance on the Agreement
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/physical"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Physical – Awaiting Customer acceptance on the Agreement
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/agent"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Awaiting Agent Appointment and Response.
                        <FaAngleRight />
                      </Link>
                      <Link
                        to="/admin/application/funding"
                        className={`${"nav__dropdown_item"} d-flex justify-content-between align-items-center`}
                      >
                        Awaiting funding and Welcome letter issuance
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
                    <img src="../../../images/tick-circle.svg" alt="" />
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
                    <img src="../../../images/close-circle.svg" alt="" />
                  </div>
                  <span className={"nav__name"}>
                    Rejected - Pending Channel correction
                  </span>
                </Link>
              </div>

              <div className={"nav__items"}>
                <Link to="/admin/dashboard/sponser" className={"nav__link"}>
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img src="../../../images/task-square.svg" alt="" />
                  </div>
                  <span className={"nav__name"}>Reports</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
