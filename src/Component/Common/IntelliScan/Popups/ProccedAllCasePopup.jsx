import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SetloaderData,
  SetpopupReducerData,
  reSetPopupReducerData,
} from "../../../../store/reducer";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../apiwrapper";
import { apiURl } from "../../../../store/actions";


function ProccedAllCasePopup() {
  const dispatch = useDispatch();
  const { PopupReducer, Loader } = useSelector((state) => state);
  const {
    selectedApplication = [],
    showModal = false,
    status,
  } = PopupReducer?.modal;
  const [format, setFormate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [sendSuccessfully, setSendSuccessfully] = useState(false);

  const handleClosePopup = async () => {
    setTimeout(() => {
      dispatch(reSetPopupReducerData());
    }, 200);
  };

  const handleProcess = async () => {
    if (!format) {
      setError("Please select channel");
      return;
    }
    try {
      let payload = {
        ids: selectedApplication,
        status: "WELCOME_LETTER_ISSUED",
        channel: format,
        showStatus: "Completed",
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.applications}`,
        method: "PUT",
        body: payload,
      });

      if (data?.status || data?.status === "true") {
        setSendSuccessfully(true);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };
  const handleThirdPartyCall = async () => {
    if (!format) {
      setError("Please select channel");
      return;
    }
    try {
      let payload = {
        mergedObjects: {
          formId: "65f31f4fc316cfc09553ac20",
          status: "AWAITING_COMMODITY_PURCHASE",
          showStatus: "Pending",
          channel: "Digital Signature",
          signature_type: "DIGITAL",
          application: true,
          isAgreementSigned: true,
          isCompleted: false,
          promise_to_purchase: true,
          credit_limit_approval: true,
          murabaha_agreement: true,
          supporting_document: true,
          murbaha_url: "",
          imported_url:
            "https://fathom-application.s3.ap-south-1.amazonaws.com/unprocessed/OK+File.pdf",
          reject_exception_document: [],
          signature: {
            status: true,
          },
          finance: {
            amount: "AED 125,000",
            date: "2024-05-14",
          },
          account_or_credit_card_number: "221633228471",
          identification_document_number: "122490",
          name_as_per_passport: "RIZWAN SAJAN",
          email_id_1: "rizwan.sajan@gmail.com",
          company_name: "\nNvidia",
          serial_number: "2063124",
          reject_reason: "",
          emi: "AED 3500",
          first_repay_date: "2024-02-16",
          tenor_months: "48",
          profit_rate_percentage: "12",
          first_applicant_date: "16/01/2024",
          cheque_payer_date: "",
          rules: [
            {
              ruleId: "65f5d917c18d1ac25d7da9ea",
              status: true,
              _id: "66430362989e11b2490c0820",
            },
            {
              ruleId: "65f5d94fc18d1ac25d7da9ec",
              status: true,
              _id: "66430362989e11b2490c0821",
            },
            {
              ruleId: "65f5d967c18d1ac25d7da9ee",
              status: true,
              _id: "66430362989e11b2490c0822",
            },
            {
              ruleId: "66430614428de47e259eccc3",
              status: true,
              _id: "66430362989e11b2490c0820",
            },
            {
              ruleId: "66430671428de47e259eccc5",
              status: true,
              _id: "66430362989e11b2490c0821",
            },
            {
              ruleId: "66430a5d50910984fffe0f74",
              status: true,
              _id: "66430362989e11b2490c0822",
            },
            {
              ruleId: "66430a5d50910984fffe0f76",
              status: true,
              _id: "66430362989e11b2490c0820",
            },
            {
              ruleId: "66430b4d50910984fffe0f7a",
              status: true,
              _id: "66430362989e11b2490c0821",
            },
            {
              ruleId: "66430b4d50910984fffe0f7c",
              status: true,
              _id: "66430362989e11b2490c0822",
            },
            {
              ruleId: "66430b4d50910984fffe0f7e",
              status: true,
              _id: "66430362989e11b2490c0820",
            },
            {
              ruleId: "66430b4e50910984fffe0f80",
              status: true,
              _id: "66430362989e11b2490c0821",
            },
            {
              ruleId: "66430b4e50910984fffe0f82",
              status: true,
              _id: "66430362989e11b2490c0822",
            },
            {
              ruleId: "66430b4e50910984fffe0f84",
              status: true,
              _id: "66430362989e11b2490c0822",
            },
          ],
        },
      };
      dispatch(SetloaderData(true));
      const data = await API({
        url: `${apiURl.thirdPartyImport}`,
        method: "POST",
        body: payload,
      });

      if (data?.status || data?.status === true) {
        dispatch(
          SetpopupReducerData({
            ...PopupReducer?.modal,
            modalType: "APP_SCAN",
            showModal: true,
            status:"THIRDPARTY"
          })
        );
        // handleClosePopup();
       
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SetloaderData(false));
    }
  };

  const onSubmit = async (e, typeSubmit, thirdPartyStatus) => {
    e.preventDefault();
    if (typeSubmit === "HOME") {
      handleClosePopup();
      navigate("/admin/intelliscan?status=pass");
    } else if (thirdPartyStatus === "THIRDPARTY") {
      handleThirdPartyCall();
    } else {
      handleProcess();
    }
  };
  return (
    <>
      <Modal
        className={"publishModal"}
        show={showModal}
        size="md"
        centered
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <div className="confirmation">
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-5">
            <div className="row mb-3">
              <h3 className="card-title text-center pb-0">
                {status === "THIRDPARTY" ? "Import" : "Proceed All Case"}{" "}
              </h3>
              <p className="card-text ">
                {sendSuccessfully && <p>Welcome letters sent!</p>}
                {!sendSuccessfully &&
                  (status === "THIRDPARTY" ? (
                    <p>
                      This interface is used to integrate and import
                      Applications from institutions such as Banks via APIs.
                    </p>
                  ) : (
                    <p>Select below.</p>
                  ))}{" "}
              </p>
              {!sendSuccessfully && (
                <>
                  {status !== "THIRDPARTY" && (
                    <>
                      <div className="col-4">
                        <p className="card-text1 mt-3">Send</p>
                      </div>
                      <div
                        className="col-8 pt-2 text-end"
                        style={{ backgroundColor: "aliceblue" }}
                      >
                        <span className="text-info mt-2 ">
                          {" "}
                          PDF and Excel format will be send to{" "}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="col-12 border p-2 m-2">
                    <div className="form-check form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="email"
                        name="format"
                        value="email"
                        checked={format === "email"}
                        onChange={(e) => setFormate(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="email">
                        {status === "THIRDPARTY" ? "Fathom" : "By Email"}
                      </label>
                    </div>
                  </div>
                  {status !== "THIRDPARTY" && (
                    <div className="col-12 border p-2 m-2">
                      <div className="form-check form-check-inline ">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="shareFolder"
                          name="format"
                          value="shareFolder"
                          checked={format === "shareFolder"}
                          onChange={(e) => setFormate(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="shareFolder"
                        >
                          To Share Folder
                        </label>
                      </div>
                    </div>
                  )}

                  {error ? <span className="text-danger">{error}</span> : ""}
                </>
              )}
            </div>

            <div
              style={{ marginTop: "100px" }}
              className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
            >
              {sendSuccessfully ? (
                <button
                  style={{ minWidth: "-webkit-fill-available" }}
                  onClick={(e) => onSubmit(e, "HOME", "")}
                >
                  Home
                </button>
              ) : (
                <button
                  style={{ minWidth: "-webkit-fill-available" }}
                  onClick={(e) => onSubmit(e, "SEND", status)}
                  disabled={Loader?.data || false}
                >
                  {status === "THIRDPARTY" ? (
                    Loader?.data ? (
                      <Spinner />
                    ) : (
                      "Fetch"
                    )
                  ) : (
                    "Send"
                  )}
                </button>
              )}
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ProccedAllCasePopup;
