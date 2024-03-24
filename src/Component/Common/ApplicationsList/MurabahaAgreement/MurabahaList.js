/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetloaderData, SetpopupReducerData } from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";
import ProceedModal from "../../../PopupModal/ProceedModal";
import { fetchApplicationList } from "../../../../Config/FetchListingData";
import moment from "moment";
import DatePicker from "react-datepicker";
import { API } from "../../../../apiwrapper";
import { apiURl } from "../../../../store/actions";

function MurabahaList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { PopupReducer } = useSelector((state) => state);
  const {
    murabahaModal = false,
    genratedModal = false,
    proceedModal = false,
  } = PopupReducer?.modal;

  const [dummyList, setDummyList] = useState([
    {
      date: new Date(),
      app_name: "220872-00",
      name: "Nolan Levin",
      email: "nolan@gmail.com",
    },
    {
      date: new Date(),
      app_name: "220873-00",
      name: "Aaeesha Mohamed ",
      channel: true,
    },
    {
      app_name: "220874-00",
      name: "Jaydon Calzoni",
      email: "jaydon@yahoo.com",
      date: new Date(),
    },
    {
      app_name: "220875-00",
      name: "Maadhav Nazar ",
      channel: true,
      date: new Date(),
    },
    {
      app_name: "220876-00",
      name: "Emerson Vetrovs",
      email: "emerson@gmail.com",
      date: new Date(),
    },
    {
      app_name: "220877-00",
      name: "Haajar Rahman",
      channel: true,
      date: new Date(),
    },
    {
      app_name: "220878-00",
      name: "Marcus Lipshutz",
      email: "marcus@yahoo.com",
      date: new Date(),
    },
    {
      app_name: "220879-00",
      name: "Zaire Culhane",
      channel: true,
      date: new Date(),
    },
    {
      app_name: "220880-00",
      name: "Saadiq Yousuf ",
      email: "saadiq@gmail.com",
      date: new Date(),
    },
  ]);
  const handleProcess = async () => {
    try {
      let payload = {
        ids: selectedApplication,
        status: "AWAITING_DIGITAL_SINGNATURE",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        dispatch(
          SetpopupReducerData({
            modalType: "MURABAHA_SUCCESS",
            showModal: true,
            action: action,
          })
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  // navigate to agreement

  const [arrList, setArrList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [action, setAction] = useState("ALL");

  const [filterKey, setFilterKey] = useState({
    serial_number: "",
    // pageNo: currentPage,
    // limit: perPage,
    startDate: "",
    endDate: "",
    periodFrom: "",
  });
  const handleChangeCheckBox = (e, id) => {
    let arr = [...selectedApplication];
    if (e.target.checked) {
      arr.push(id);
    } else {
      arr = arr.filter((ele) => ele !== id);
    }
    setSelectedApplication(arr);
  };
  const handleSelectFilter = (e) => {
    let value = e.target.value;
    let arr = [];
    setAction(value);
    if (value === "ALL") {
      arr = arrList?.map((ele) => ele._id);
    } else if (value === "EMAIL") {
      arr = arrList?.filter((ele) => !ele?.channel)?.map((e) => e?._id);
    } else if (value === "CHANNEL") {
      arr = arrList?.filter((ele) => ele?.channel)?.map((e) => e?._id);
    }
    setSelectedApplication(arr);
  };
  const navigateToAgreement = async () => {
    // navigate("/admin/application/sent");
    if (selectedApplication?.length === 0) {
      alert("Please select application to proceed.");
      return;
    }

    await handleProcess();
  };
  const fetchListingData = useCallback(async () => {
    try {
      let payload = {
        status: "AWAITING_AGENT_APPOINTMENT",
        ...filterKey,
      };
      const data = await dispatch(fetchApplicationList(payload, filterKey));
      if (data?.status || data?.status === "true") {
        console.log(data, "dattt");
        setArrList(data?.results);
      } else {
        setArrList([...dummyList]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [filterKey]);

  useEffect(() => {
    fetchListingData();
  }, [fetchListingData]);
  console.log(selectedApplication, "list");
  return (
    <>
      {proceedModal && <ProceedModal />}

      <section className="">
        <div className="container">
          <div className="voucherFormMain upload_new_application">
            <h3>Murabaha Agreement</h3>
            {!murabahaModal && !genratedModal && (
              <>
                <div className="top_list px-4">
                  <p className="card-text1">
                    Murabaha Agreement will be sent to following recipient.
                  </p>
                  <div
                    className={`d-flex align-items-center  pt-4 ${"saveBtn"}`}
                  >
                    {/* <button style={{ width: "274px" ,marginRight:"9px"}}>No</button>  */}
                    <button
                      className="w-25 button"
                      onClick={() => navigateToAgreement()}
                    >
                      Proceed
                    </button>
                  </div>

                  <div className="row pt-4">
                    <div className="col-md-3">
                      <label className="label">Filter Channel</label>
                      <select
                        class="form-select p-3"
                        name="action"
                        value={action}
                        onChange={handleSelectFilter}
                      >
                        <option value={"ALL"}>All</option>
                        <option value={"EMAIL"}>Email</option>
                        <option value={"CHANNEL"}>Channel</option>
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="label">Search Application</label>
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
                    <div className="col-3">
                      <label className="label">Date from</label>
                      <div className="  text-right">
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
                    </div>
                    <div className="col-3">
                      <label className="label">Date to</label>
                      <div className=" text-right">
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
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className=" row my-5" id="table-contexual">
                    <div className="col-12">
                      <table class="table muraba">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col"> </th>
                            <th scope="col">S.No. </th>
                            <th scope="col">Date</th>
                            <th scope="col">Application no.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email/Channel</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arrList?.map((item, index) => (
                            <tr key={item?._id}>
                              <td>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={item._id}
                                    checked={selectedApplication?.includes(
                                      item?._id
                                    )}
                                    onChange={(e) =>
                                      handleChangeCheckBox(e, item._id)
                                    }
                                  />
                                </div>
                              </td>

                              <td>{index + 1}</td>
                              <td>
                                {moment(item?.createdAt)
                                  .local()
                                  .format("DD/MM/YYYY hh:mm a")}
                              </td>
                              <td>{item?.serial_number}</td>
                              <td>{item?.name_as_per_passport}</td>

                              {item?.channel ? (
                                <td>
                                  {" "}
                                  <span className="send_back">
                                    Send back to Tele sales
                                  </span>
                                </td>
                              ) : (
                                <td>{item?.email_id_1}</td>
                              )}
                              <td>
                                {" "}
                                <a
                                  href={item?.reject_exception_document}
                                  target="_blank"
                                >
                                  <div className="view_btn">View</div>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MurabahaList;
