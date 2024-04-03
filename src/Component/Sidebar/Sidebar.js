/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FaAngleDown, FaChevronRight, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { SetpopupReducerData } from "../../store/reducer";

function Sidebar({ showMenu, setShowMenu }) {
  const { authUser } = useSelector((state) => state);
  const [showActive, setShowActive] = useState(-1);
  const [openDropdown, setOpenDropdown] = useState(-1);
  const [openProcess, setOpenProcess] = useState(-1);
  const location = useLocation();
  const pathname = location?.pathname?.split("/");
  const dispatch = useDispatch();
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
  const handleOpenLogOut = () => {
    dispatch(
      SetpopupReducerData({
        modalType: "LOGOUT",
        showModal: true,
      })
    );
  };
  return (
    <>
      <div className="header__toggle">
        <i
          className={`${"respMenu"} ${showMenu ? "active" : ""}`}
          id="header-toggle"
          onClick={toggleMenu}
        >
          <FaChevronRight />
        </i>
      </div>
      <div className={`${"nav_2"} ${showMenu ? "active" : ""}`} id={"navbar"}>
        <button className={"toggleClose"} onClick={toggleMenu}>
          <FaXmark />
        </button>

        <nav className={"nav__container"}>
          <div>
            <div className={"nav__list"}>
              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link to="/admin/dashboard" className={"nav__link"}>
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"}  `}
                  >
                    <img
                      alt="logo"
                      src="../../../images/fathom_logo.png"
                      className="header_logo"
                    ></img>
                  </div>
                  <span className="logo-content">Fathom</span>
                </Link>
              </div>

              <div
                className={`${"nav__items"}  ${
                  pathname?.includes("dashboard") === 1 ? "active" : ""
                } `}
              >
                <Link
                  to="/admin/dashboard"
                  className={`nav__link ${
                    pathname?.includes("dashboard") ? "activeLink" : ""
                  }`}
                >
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
                <Link
                  to="/admin/application/status"
                  className={`nav__link ${
                    pathname?.includes("status") ? "activeLink" : ""
                  }`}
                >
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
                <Link
                  to="/admin/application/upload"
                  className={`nav__link ${
                    pathname?.includes("upload") ? "activeLink" : ""
                  }`}
                >
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img
                      src="../../../images/sendSquare.png"
                      width={25}
                      alt=""
                    />
                  </div>
                  <span className={"nav__name"}> Ready to be import</span>
                </Link>
              </div>

              <div className={"nav__items"}>
                <div
                  className={`${"nav__dropdown"} ${
                    openProcess === 1 ? "open" : ""
                  }  `}
                >
                  <a
                    to="#"
                    className={"nav__link"}
                    onClick={() => setOpenProcess(openProcess === 1 ? -1 : 1)}
                  >
                    <div
                      className={` ${"icon_cmn"} ${"bx_home"} ${"nav__icon"}`}
                    >
                      <img
                        src="../../../images/closeCircle.png"
                        width={25}
                        alt=""
                      />
                    </div>
                    <span className={"nav__name"}>Under Process</span>
                    <i
                      className={` ${"ms_auto"} ${"bx_chevron_down"} ${"nav__icon"} ${
                        openProcess === 1 ? "open" : ""
                      } `}
                    >
                      <FaAngleDown />
                    </i>
                  </a>
                  <div
                    className={`${"nav__dropdown_collapse"} ${
                      openProcess === 1 ? "open" : ""
                    }`}
                  >
                    <div className={"nav__dropdown_content"}>
                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/application/list"
                          className={`nav__link mx-2 ${
                            pathname?.includes("list") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}>
                            Awaiting Commodity Purchase
                          </span>
                        </Link>
                      </div>

                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/application/sent"
                          className={`nav__link mx-2 ${
                            pathname?.includes("sent") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}>
                            Digital: Awaiting Customer
                            <br /> acceptance on the Agreement
                          </span>
                        </Link>
                      </div>

                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/application/murabaha"
                          className={`nav__link mx-2 ${
                            pathname?.includes("murabaha") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}>
                            Physical – Awaiting Customer <br /> acceptance on
                            the Agreement
                          </span>
                        </Link>
                      </div>

                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/application/sent/response"
                          className={`nav__link mx-2 ${
                            pathname?.includes("response") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}>
                            Awaiting Agent <br />
                            Appointment and Response.
                          </span>
                        </Link>
                      </div>

                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/application/commodity"
                          className={`nav__link mx-2 ${
                            pathname?.includes("commodity") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}>
                            Awaiting funding and <br />
                            Welcome letter issuance
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link
                  className={`nav__link  ${
                    pathname?.includes("completed") ? "activeLink" : ""
                  }`}
                  to="/admin/application/completed"
                >
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img
                      src="../../../images/doneCircle.png"
                      width={25}
                      alt=""
                    />
                  </div>

                  <span className={"nav__name"}>
                    Completed – Welcome
                    <br /> Letter issued
                  </span>
                </Link>
              </div>

              <div
                className={`${"nav__items"}  ${
                  showActive === 1 ? "active" : ""
                } `}
              >
                <Link
                  className={`nav__link  ${
                    pathname?.includes("rejected") ? "activeLink" : ""
                  }`}
                  to="/admin/application/rejected"
                >
                  <div
                    className={` ${"icon_cmn"} ${"bx_compass"} ${"nav__icon"} `}
                  >
                    <img
                      src="../../../images/crossCircle.png"
                      width={25}
                      alt=""
                    />
                  </div>

                  <span className={"nav__name"}>
                    Rejected - Pending
                    <br /> Channel correction
                  </span>
                </Link>
              </div>

              <div className={"nav__items"}>
                <div
                  className={`${"nav__dropdown"} ${
                    openDropdown === 3 ? "open" : ""
                  }  `}
                >
                  <a
                    to="#"
                    className={"nav__link"}
                    onClick={() => toggleDropdown(3)}
                  >
                    <div
                      className={` ${"icon_cmn"} ${"bx_home"} ${"nav__icon"}`}
                    >
                      <img src="../../images/report_icon.svg"></img>
                    </div>
                    <span className={"nav__name"}>Reports</span>
                    <i
                      className={` ${"ms_auto"} ${"bx_chevron_down"} ${"nav__icon"} ${
                        openDropdown === 3 ? "open" : ""
                      } `}
                    >
                      <FaAngleDown />
                    </i>
                  </a>
                  <div
                    className={`${"nav__dropdown_collapse"} ${
                      openDropdown === 3 ? "open" : ""
                    }`}
                  >
                    <div className={"nav__dropdown_content"}>
                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/reports/disbursal"
                          className={`nav__link mx-2  ${
                            pathname?.includes("disbursal") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}> Disbursal Report</span>
                        </Link>
                      </div>
                      <div
                        className="ml-5 my-2 d-flex "
                        style={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          marginLeft: "20px",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-2"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="5.25"
                            stroke="#151517"
                            stroke-width="1.5"
                          />
                        </svg>
                        <Link
                          to="/admin/reports/error"
                          className={`nav__link mx-2  ${
                            pathname?.includes("error") ? "activeLink" : ""
                          }`}
                        >
                          <span className={"nav__name"}>Pending / Error</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="logout-div  row">
            <div className={`col-6`}>
              <img
                src="../../images/profile.jpg"
                style={{ width: "25px" }}
                className="mx-2 rounded-circle"
              />
              <span className="mx-2 ">
                {`${authUser?.data?.first_name} ${authUser?.data?.last_name} `}{" "}
              </span>
            </div>
            <div className="col-6 text-end">
              <img
                src="../../images/setting.png"
                style={{ width: "25px", cursor: "pointer" }}
                className="mx-2"
              />

              <img
                src="../../images/logOut.png"
                style={{ width: "25px", cursor: "pointer" }}
                className="mx-2"
                onClick={handleOpenLogOut}
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
