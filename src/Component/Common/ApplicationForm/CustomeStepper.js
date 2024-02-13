import React, { useEffect, useState } from "react";
import ManageStep from "./ManageStep";
import FormStep from "./FormStep";
import BasicInfo from "./VerifyDocuments";
import { useDispatch, useSelector } from "react-redux";

import {
  CreateEcommerceData,
  SetpopupReducerData,
} from "../../../store/reducer/index";
import PurchaseCommodity from "./PurchaseCommodity";
import SignAgreement from "./SignAgreement";
import SellCommodity from "./SellCommodity";
import Disburseloan from "./Disburseloan";
import Publish from "../../PopupModal/Publish";
let payload = {};
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function CustomStepper() {
  // const params = useParams();
  // const brandId = params?.id;
  // const updateId = params;

  const [isMounted, setIsMounted] = useState(false);
  const [inbuiltState, setState] = useState({});
  const [Predata, setPredata] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmited, setIsSubmited] = useState([]);
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false } = PopupReducer?.modal;
  // const { step1Details } = useSelector((state) => state?.Common);

  const eventsteps = [
    {
      id: 1,
      label: "Verify Document",
      component: <Step1 />,
      type: "basicInfo",
    },
    {
      id: 2,
      label: "Purchase Commodity",
      component: <Step2 />,
      type: "purchase",
    },
    {
      id: 3,
      label: "Sign Murabaha Agreement",
      component: <Step3 />,
      type: "signAgreement",
    },
    {
      id: 4,
      label: "Sell Commodity ",
      component: <Step4 />,
      type: "sellCommodity",
    },
    {
      id: 5,
      label: "Disburse Loan",
      component: <Step5 />,
      type: "disburseLoan",
    },
  ];

  const rejectedsteps = [
    {
      id: 1,
      label: "Verify Document",
      component: <Step1 />,
      type: "basicInfo",
    },
    {
      id: 2,
      label: "Purchase Commodity",
      component: <Step2 />,
      type: "purchase",
    },
    {
      id: 3,
      label: "Sign Murabaha Agreement",
      component: <Step3 />,
      type: "signAgreement",
    },
    {
      id: 4,
      label: "Sell Commodity ",
      component: <Step4 />,
      type: "sellCommodity",
    },
    {
      id: 5,
      label: "Disburse Loan",
      component: <Step5 />,
      type: "disburseLoan",
    },
  ];

  const inprocessedsteps = [
    {
      id: 1,
      label: "Verify Document",
      component: <Step1 />,
      type: "basicInfo",
    },
    {
      id: 2,
      label: "Purchase Commodity",
      component: <Step2 />,
      type: "purchase",
    },
    {
      id: 3,
      label: "Sign Murabaha Agreement",
      component: <Step3 />,
      type: "signAgreement",
    },
    {
      id: 4,
      label: "Sell Commodity ",
      component: <Step4 />,
      type: "sellCommodity",
    },
    {
      id: 5,
      label: "Disburse Loan",
      component: <Step5 />,
      type: "disburseLoan",
    },
  ];
  const loandisbursedsteps = [
    {
      id: 1,
      label: "Verify Document",
      component: <Step1 />,
      type: "basicInfo",
    },
    {
      id: 2,
      label: "Purchase Commodity",
      component: <Step2 />,
      type: "purchase",
    },
    {
      id: 3,
      label: "Sign Murabaha Agreement",
      component: <Step3 />,
      type: "signAgreement",
    },
    {
      id: 4,
      label: "Sell Commodity ",
      component: <Step4 />,
      type: "sellCommodity",
    },
    {
      id: 5,
      label: "Disburse Loan",
      component: <Step5 />,
      type: "disburseLoan",
    },
  ];

  const handleNextStep = (e) => {
    if (currentStep < getStep(createType).length) {
      if (createType == "unprocessed") {
        // errorHandle(e);
        upadteSubmitArray(eventsteps);
      } else if (createType == "rejected") {
        upadteSubmitArray(rejectedsteps);
      } else if (createType == "inprocessed") {
        upadteSubmitArray(inprocessedsteps);
      } else if (createType == "loandisbursed") {
        upadteSubmitArray(loandisbursedsteps);
      }
    }
  };

  // // update  product Api
  // const fetchEventEditData = async () => {
  //   try {
  //     let url = `${adminApiUrl.getBrand}/lists`;
  //     await CLIENTADMINAPI({
  //       url: url,
  //       method: "POST",
  //       body: { _id: updateId?.updateForm[1] },
  //     }).then((res) => {
  //       setPredata(res?.data[0]);
  //     });
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // };

  // const fetchproductEditData = async () => {
  //   try {
  //     let url = `${adminApiUrl.product}/lists`;
  //     await CLIENTADMINAPI({
  //       url: url,
  //       method: "POST",
  //       body: { _id: updateId?.updateForm[1] },
  //     }).then((res) => {
  //       console.log("res===>", res);
  //       setPredata(res?.data[0]);
  //     });
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // };
  // const fetchTicketEditData = async () => {
  //   try {
  //     let url = `${adminApiUrl.product}/lists`;
  //     await CLIENTADMINAPI({
  //       url: url,
  //       method: "POST",
  //       body: { _id: updateId?.updateForm[1] },
  //     }).then((res) => {
  //       setPredata(res?.data[0]);
  //     });
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // };

  // event
  // useEffect(() => {
  //   if (!isMounted) {
  //     setIsMounted(true);
  //   } else {
  //     if (
  //       Array.isArray(updateId?.updateForm) &&
  //       updateId?.updateForm[0].includes("edit") &&
  //       (createType === "product" ||
  //         createType === "PRODUCT" ||
  //         createType === "sponser" ||
  //         createType === "SPONSER")
  //     ) {
  //       fetchproductEditData();
  //     } else if (
  //       Array.isArray(updateId.updateForm) &&
  //       updateId?.updateForm[0].includes("edit") &&
  //       createType === "event"
  //       // ||createType === "registration"
  //     ) {
  //       fetchEventEditData();
  //     } else if (
  //       Array.isArray(updateId.updateForm) &&
  //       updateId?.updateForm[0].includes("edit") &&
  //       createType === "ticket"
  //     ) {
  //       fetchTicketEditData();
  //     }

  //     // Your code here
  //   }
  //   console.log(createType, "createTypecreateType");
  // }, [isMounted]);

  const upadteSubmitArray = (list, type) => {
    let _isSubmited = JSON.parse(JSON.stringify(isSubmited));
    let index = _isSubmited?.findIndex(
      (ele) => ele.type === list[currentStep - (type === "pre" ? 2 : 1)].type
    );
    if (index > -1) {
      _isSubmited[index].submit =
        type === "pre" || type === "last" ? false : true;
    } else {
      let payload = {
        submit: type === "pre" ? false : true,
        type: list[currentStep - (type === "pre" ? 2 : 1)].type,
      };
      _isSubmited.push(payload);
    }
    setIsSubmited(_isSubmited);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      if (createType == "unprocessed") {
        upadteSubmitArray(eventsteps, "pre");
      } else if (createType == "rejected") {
        upadteSubmitArray(rejectedsteps, "pre");
      } else if (createType == "inprocessed") {
        upadteSubmitArray(inprocessedsteps, "pre");
      } else if (createType == "loandisbursed") {
        upadteSubmitArray(loandisbursedsteps, "pre");
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const componentCallback = async (cbData) => {
    // check for validation next page
    payload = { ...inbuiltState, ...cbData };
    if (cbData?.isValid === false) {
      // toast.error('All value is required !')
      // e.target.classList.add('input-error');
      return;
    } else {
      setState(payload);
      if (currentStep < getStep(createType)?.length) {
        setCurrentStep(currentStep + 1);
      }
      // e.target.classList.remove('input-error');
    }
  };

  // console.log(commonReducer, "commonReducer");
  useEffect(() => {
    let index = isSubmited?.findIndex(
      (ele) =>
        ele.type ===
          (createType == "rejected"
            ? "disburseLoan"
            : createType == "inprocessed" || createType == "loandisbursed"
            ? "disburseLoan"
            : createType == "registration" || createType === "SPONSER"
            ? "disburseLoan"
            : "disburseLoan") && ele?.submit
    );
    if (index > -1) {
      if (createType == "unprocessed") {
        upadteSubmitArray(eventsteps, "last");
      } else if (createType == "rejected") {
        upadteSubmitArray(rejectedsteps, "last");
      } else if (createType == "inprocessed") {
        upadteSubmitArray(inprocessedsteps, "last");
      } else if (createType == "loandisbursed") {
        upadteSubmitArray(loandisbursedsteps, "last");
      }
      dispatch(CreateEcommerceData(payload));
    }
  }, [isSubmited]);

  useEffect(() => {
    dispatch(CreateEcommerceData({}));
  }, []);
  // MANAGE TO STEP
  function Step1() {
    return (
      <div>
        <BasicInfo
          callback={(cbData) => componentCallback(cbData)}
          submitArray={isSubmited}
          // brand_id={brandId}
          preDataObj={Predata}
        />
      </div>
    );
  }
  function Step2() {
    return (
      <div>
        <PurchaseCommodity
          callback={(cbData) => componentCallback(cbData)}
          submitArray={isSubmited}
          // brand_id={brandId}
          preDataObj={Predata}
        />
      </div>
    );
  }
  function Step3() {
    return (
      <div>
        <SignAgreement
          callback={(cbData) => componentCallback(cbData)}
          submitArray={isSubmited}
          // brand_id={brandId}
          preDataObj={Predata}
        />
      </div>
    );
  }
  function Step4() {
    return (
      <div>
        <SellCommodity
          callback={(cbData) => componentCallback(cbData)}
          submitArray={isSubmited}
          // brand_id={brandId}
          preDataObj={Predata}
        />
      </div>
    );
  }
  function Step5() {
    return (
      <div>
        <Disburseloan
          callback={(cbData) => componentCallback(cbData)}
          submitArray={isSubmited}
          // brand_id={brandId}
          preDataObj={Predata}
        />
      </div>
    );
  }

  // Step managed
  const getStep = (_createType) => {
    let step = eventsteps;
    if (_createType == "unprocessed") {
      step = eventsteps;
    } else if (_createType == "rejected") {
      step = rejectedsteps;
    } else if (_createType == "inprocessed") {
      step = inprocessedsteps;
    } else if (_createType == "loandisbursed") {
      step = loandisbursedsteps;
    }
    return step;
  };

  const handleShow = () => {
    if (createType == "unprocessed") {
      upadteSubmitArray(eventsteps);
    } else if (createType == "rejected") {
      upadteSubmitArray(rejectedsteps);
    } else if (createType == "inprocessed") {
      upadteSubmitArray(inprocessedsteps);
    } else if (createType == "loandisbursed") {
      upadteSubmitArray(loandisbursedsteps);
    }

    dispatch(
      SetpopupReducerData({
        modalType: "PUBLISH",
        showModal: true,
        // updateId: updateId,
      })
    );
  };

  return (
    <>
      {showModal && <Publish />}

      <section className="">
        <div className="container">
          <div className="voucherFormMain d-flex">
            <div className="titleLeft">
              <FormStep currentStep={currentStep} steps={getStep(createType)} />
            </div>
            <div className="formRight px-5">
              <p className="mb-lg-4 mb-3 titleSmall">
                Create Your
                {createType
                  ? " " +
                    createType.charAt(0).toUpperCase() +
                    createType.substring(1).toLowerCase()
                  : ""}
              </p>
              <ManageStep
                // updateObj={updateId}
                createType={createType}
                handleShow={() => handleShow()}
                handleNextStep={(e) => handleNextStep(e)}
                handlePrevStep={() => handlePrevStep()}
                currentStep={currentStep}
                steps={getStep(createType)}
                preDataObj={Predata}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CustomStepper;
