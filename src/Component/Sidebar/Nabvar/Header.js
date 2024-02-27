import React, {  useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
//   const dispatch = useDispatch();
  //   const { User = {} } = useSelector((state) => state);
  //   const { AuthAdmin } = useSelector((state) => state);

  const [showNavbar, setShowNavbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  //   const { PopupReducer } = useSelector((state) => state);
  //   const { commonConfig } = useSelector((state) => state?.Config);
  //   const { showModal = false } = PopupReducer?.modal;
  //   const profileImage =
  //     User?.data?.data?.image[0]?.profile || User?.data?.data?.image?.profile;

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar);
//   };

  //   let userId = User?.data?.data?._id;
  // let userPoint = User?.data?.data?.point;
  // console.log(User, "UserUser");
  //   const path = usePathname();
  // console.log("path", path);
  //   const navigate = useRouter();
//   const handleShowLogin = () => {
//     // if (!User?.data?.token) {
//     dispatch(
//       SetpopupReducerData({
//         // modalType: "LOGIN",
//         modalType: "MOBILELOGIN",
//         showModal: true,
//       })
//     );
//     // }
//   };

  //   const Logout = async (e) => {
  //     e.preventDefault();
  //     // alert("hello maya ")
  //     // let macaddress = localStorage.getItem("macaddress");

  //     try {
  //       // Clear local storage
  //       localStorage.removeItem("token");
  //       localStorage.clear();
  //       // Dispatch actions to reset data
  //       // console.log("start clear reducer");
  //       dispatch(ResetActiveModule({}));
  //       dispatch(resetAuthUserData());
  //       dispatch(SetAuthAdminData({}));
  //       dispatch(LogoutUser({}));
  //       dispatch(SetUserData({}));
  //       dispatch(SetAuthUserData({}));
  //       dispatch(SetAuthAdminData({}));
  //       dispatch(SethomeData());

  //       // console.log("end  clear reducer");
  //       const data = await Api({
  //         url: `${apiURl.banner}?role=guest&location_id=`,
  //         method: "GET",
  //       });

  //       // Update the home data using the fetched data
  //       // console.log("data-------", data);
  //       dispatch(SethomeData(data));
  //     } catch (error) {
  //       console.error("Logout error:", error);
  //       throw error;
  //     }

  //     window.location.reload(true);
  //     // after exicute code then it will redirect to home page
  //     // window.location.href = "/";
  //     navigate.push("/");
  //   };

  //   useEffect(() => {
  //     setShowPopup(showModal);
  //     return () => {
  //       setShowPopup(false);
  //     };
  //   }, [showModal]);

  return (
    <>
      <header className="headerHome">
        <div className="headerTwo">
          <div className="container-fluid px-xl-5">
            <div className="row align-item-center justify-content-xl-between">
              <div className="col-4 col-lg-2">
                <div
                  className="menuHome"
                  //   className={`${
                  //     path.includes("profile") ? "ps-4" : ""
                  //   } menuHome`}
                >
                  <ul>
                    <li>
                      <Link href="/admin/dashboard/main">
                        {typeof window !== "undefined" && (
                           
                          <img
                            alt="logo"
                            src="../../../images/fathom_logo.png"
                            className="header_logo"
                            
                          />
                        )}
                      </Link>
                      <span className="logo-content">Fathom</span>
                    </li>
                    <li className="d-none">
                      <Link href="/about">
                        About
                        {/* {commonConfig?.Strings?.ABOUT_TEXT} */}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-8 col-lg-10 col-xxl-10 d-flex align-items-center justify-content-between">
                <div className="">
                  {/* <input placeholder="Search" type=""></input> */}
                  {/* <button>
                      <Image
                        src="../../../images/Icon-search.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </button> */}
                </div>
                <div className="">
                  <ul className="">
                    <>
                      <>
                        {/* {!AuthAdmin?.data?._id ? ( */}
                          <>
                            <li className={""}>
                              <span>Dont't have an account?</span>
                              <button
                                data-toggle="modal"
                                data-target="/loginModal"
                                // onClick={() => {
                                //   handleShowLogin();
                                // }}
                                className="btn btn-default"
                              >
                                <span className="d-none d-sm-block">
                                  Signup
                                </span>
                                {/* <BsPersonCircle className="d-block d-sm-none" /> */}
                              </button>
                            </li>
                          </>
                        {/* ) : (
                          <>
                            <li>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  className="nav-link dropdown-toggle userProfile"
                                  id="navbarDropdown"
                                  role="button"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <span className="position-relative">
                                    <img
                                      src={
                                        AuthAdmin?.data?.image[0]?.profile
                                          ? AuthAdmin?.data?.image[0]?.profile
                                          : 
                                          "/public/images/profile.jpg"
                                      }
                                      alt=""
                                      width={20}
                                      height={20}
                                    />

                                    <span
                                      className="d-none d-lg-inline-block"
                                      style={{
                                        position: "absolute",
                                        top: "-10px",
                                        bottom: "0",
                                        left: "0",
                                        right: "3px",
                                        fontSize: "",
                                      }}
                                    >
                                      {
                                      AuthAdmin?.data?.launch?.name ||
                                        (AuthAdmin?.data?.firstName
                                          ? AuthAdmin.data.firstName.charAt(0)
                                          : 
                                          ""
                                          )
                                          }
                                    </span>
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu ul>
                                 
                                  <DropdownItem
                                    className="dropdown-item"
                                    data-toggle="modal"
                                    data-target="/loginModal"
                                    onClick={Logout}
                                  >
                                    <BiLogInCircle />{" "}
                                    Logout
                                  </DropdownItem>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>
                          </>
                        )} */}
                      </>
                    </>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
