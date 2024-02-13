
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";


function ManageStep({
  handleNextStep,
  handlePrevStep,
  currentStep,
  steps,
  handleShow,
  updateObj,
  preDataObj,
  createType,
}) {
  // const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const { productListConfig } = useSelector((state) => state?.Config);
  // const {
  //   step1Details,
  //   errors,
  //   endDate,
  //   startDate,
  //   value,
  //   valuetwo,
  //   priceDetails,
  //   discountDetails,
  //   termsDetails: { terms },
  //   cancellationDetails: { cancellation_policy },
  //   returnDetails: { return_policy },
  //   refundDetails: { refund_policy },
  //   transferDetails: { transfer_policy },
  //   resellerDetails: { resell_policy },
  //   venueDetails: { venue_details },
  // } = useSelector((state) => state?.Common);
  // const { fileData } = useSelector((state) => {
  //   return {
  //     fileData: state.UploadFiles.fileData,
  //   };
  // });
  // const { fileMainData2, fileSideData2 } = useSelector((state) => {
  //   return {
  //     fileMainData2: state.UploadFilesMainBanner.fileMainData,
  //     fileSideData2: state.UploadFilesSideBanner.fileSideData,
  //   };
  // });



  // const errorEventHandle = () => {
  //   let isError = false;
  //   if (currentStep == 1) {
  //     let updateError = cloneDeep(errors?.step1Error);
  //     const requiredFields = [
  //       "name",
  //       "category",
  //       "subcategory",
  //       // "description",
  //       "location_id",
  //     ];
  //     map(step1Details, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         updateError[key] = isEmpty(step);
  //         if (!isError && isEmpty(step)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         step1Error: updateError,
  //       })
  //     );
  //   } else if (currentStep == 2) {
  //     let updateError = cloneDeep(errors?.venueError);
  //     const requiredFields = [
  //       "addressOne",
  //       "country",
  //       "state",
  //       // "city",
  //       "pinCode",
  //     ];
  //     map(venue_details, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         updateError[key] = isEmpty(step);
  //         if (!isError && isEmpty(step)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         venueError: updateError,
  //       })
  //     );
  //   } else if (currentStep == 3) {
  //     let updateError = cloneDeep(errors?.imageError);
  //     let isError = false;

  //     updateError.image = fileData?.length <= 0;
  //     updateError.mainBanner = fileMainData2?.length <= 0;
  //     updateError.sideBanner = fileSideData2?.length <= 0;
  //     if (
  //       fileData?.length <= 0 ||
  //       fileMainData2?.length <= 0 ||
  //       fileSideData2?.length <= 0
  //     ) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         imageError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 4) {
  //     let updateError = cloneDeep(errors?.dateTimeError);
  //     let isError = false;

  //     updateError.startDate = startDate == "" || startDate == null;
  //     // updateError.endDate = endDate == "" || endDate == null;
  //     // updateError.startTime = value == "" || value == null;
  //     // updateError.endTime = valuetwo == "" || valuetwo == null;

  //     if (
  //       startDate == "" ||
  //       startDate == null
  //       // endDate == "" ||
  //       // endDate == null ||
  //       // value == "" ||
  //       // value == null
  //       // valuetwo == "" ||
  //       // valuetwo == null
  //     ) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         dateTimeError: updateError,
  //       })
  //     );
  //     return isError;
  //   }
  //   return isError;
  // };

  // const errorTicketHandle = () => {
  //   let isError = false;
  //   if (currentStep == 1) {
  //     let updateError = cloneDeep(errors?.step1Error);
  //     const requiredFields = [
  //       "name",
  //       "category",
  //       "brand_id",
  //       "subcategory",
  //       // "description",
  //       "location_id",
  //     ];
  //     map(step1Details, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         updateError[key] = isEmpty(step);
  //         if (!isError && isEmpty(step)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         step1Error: updateError,
  //       })
  //     );
  //   } else if (currentStep == 2) {
  //     let updateError = cloneDeep(errors?.imageError);
  //     let isError = false;
  //     updateError.image = fileData?.length <= 0;

  //     if (fileData?.length <= 0) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         imageError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 3) {
  //     let updateError = cloneDeep(errors?.priceError);
  //     const requiredFields = priceDetails?.isFree
  //       ? []
  //       : [
  //           "minBuy",
  //           "maxBuy",
  //           // "retailPrice",
  //           "sellingPrice",
  //           "tax",
  //         ];
  //     map(priceDetails, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         const convertString =
  //           typeof step === "number" && step > 0 ? JSON.stringify(step) : step;
  //         updateError[key] = isEmpty(convertString);
  //         if (!isError && isEmpty(convertString)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         priceError: updateError,
  //       })
  //     );
  //   } else if (currentStep == 4) {
  //     let updateError = cloneDeep(errors?.dateTimeError);

  //     updateError.startDate = startDate == "" || startDate == null;
  //     // updateError.endDate = endDate == "" || endDate == null;
  //     // updateError.startTime = value == "" || value == null;
  //     // updateError.endTime = valuetwo == "" || valuetwo == null;

  //     if (
  //       startDate == "" ||
  //       startDate == null
  //       // endDate == "" ||
  //       // endDate == null ||
  //       // value == "" ||
  //       // value == null
  //       // valuetwo == "" ||
  //       // valuetwo == null
  //     ) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         dateTimeError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 7) {
  //     let updateError = cloneDeep(errors?.termsError);
  //     const requiredFields = ["URL", "Description"];
  //     if (terms?.useTix) {
  //       map(terms, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(terms, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         termsError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 8) {
  //     let updateError = cloneDeep(errors?.cancellationError);
  //     const requiredFields = ["URL", "Description"];
  //     if (cancellation_policy?.useTix) {
  //       map(cancellation_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(cancellation_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         cancellationError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 9) {
  //     let updateError = cloneDeep(errors?.returnError);
  //     const requiredFields = ["URL", "Description"];
  //     if (return_policy?.useTix) {
  //       map(return_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(return_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         returnError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 10) {
  //     let updateError = cloneDeep(errors?.refundError);
  //     const requiredFields = ["URL", "Description"];
  //     if (refund_policy?.useTix) {
  //       map(refund_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(refund_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         refundError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 11) {
  //     let updateError = cloneDeep(errors?.transferError);
  //     const requiredFields = ["URL", "Description"];
  //     if (transfer_policy?.useTix) {
  //       map(transfer_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(transfer_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         transferError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 12) {
  //     let updateError = cloneDeep(errors?.resellError);
  //     const requiredFields = ["URL", "Description"];
  //     if (resell_policy?.useTix) {
  //       map(resell_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(resell_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         resellError: updateError,
  //       })
  //     );
  //     return isError;
  //   }
  //   return isError;
  // };

  // const errorSponserHandle = () => {
  //   let isError = false;
  //   if (currentStep == 1) {
  //     let updateError = cloneDeep(errors?.step1Error);
  //     const requiredFields = [
  //       "name",
  //       "category",
  //       "brand_id",
  //       "subcategory",
  //       // "description",
  //       "location_id",
  //     ];
  //     map(step1Details, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         updateError[key] = isEmpty(step);
  //         if (!isError && isEmpty(step)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         step1Error: updateError,
  //       })
  //     );
  //   } else if (currentStep == 2) {
  //     let updateError = cloneDeep(errors?.imageError);
  //     let isError = false;
  //     updateError.image = fileData?.length <= 0;

  //     if (fileData?.length <= 0) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         imageError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 3) {
  //     let updateError = cloneDeep(errors?.priceError);
  //     const requiredFields = [
  //       // "minBuy",
  //       // "maxBuy",
  //       // "retailPrice",
  //       // "sellingPrice",
  //       // "tax",
  //     ];
  //     map(priceDetails, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         const convertString =
  //           typeof step === "number" && step > 0 ? JSON.stringify(step) : step;
  //         updateError[key] = isEmpty(convertString);
  //         if (!isError && isEmpty(convertString)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         priceError: updateError,
  //       })
  //     );
  //   }else if (currentStep == 4) {
  //     let updateError = cloneDeep(errors?.discountError);
  //     console.log(updateError,'updateErrorupdateError')
  //     updateError.codes = discountDetails?.codes[0]?.code == ""
  //     if( discountDetails?.codes[0]?.code == ""){
  //       isError = true;
  //     }

  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         discountError: updateError,
  //       })
  //     );
  //   } else if (currentStep == 5) {
  //     let updateError = cloneDeep(errors?.dateTimeError);

  //     updateError.startDate = startDate == "" || startDate == null;
  //     // updateError.endDate = endDate == "" || endDate == null;
  //     // updateError.startTime = value == "" || value == null;
  //     // updateError.endTime = valuetwo == "" || valuetwo == null;

  //     if (
  //       startDate == "" ||
  //       startDate == null
  //       // endDate == "" ||
  //       // endDate == null ||
  //       // value == "" ||
  //       // value == null
  //       // valuetwo == "" ||
  //       // valuetwo == null
  //     ) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         dateTimeError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 7) {
  //     let updateError = cloneDeep(errors?.termsError);
  //     const requiredFields = ["URL", "Description"];
  //     if (terms?.useTix) {
  //       map(terms, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(terms, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         termsError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 8) {
  //     let updateError = cloneDeep(errors?.cancellationError);
  //     const requiredFields = ["URL", "Description"];
  //     if (cancellation_policy?.useTix) {
  //       map(cancellation_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(cancellation_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         cancellationError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 9) {
  //     let updateError = cloneDeep(errors?.returnError);
  //     const requiredFields = ["URL", "Description"];
  //     if (return_policy?.useTix) {
  //       map(return_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(return_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         returnError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 10) {
  //     let updateError = cloneDeep(errors?.refundError);
  //     const requiredFields = ["URL", "Description"];
  //     if (refund_policy?.useTix) {
  //       map(refund_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(refund_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         refundError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 11) {
  //     let updateError = cloneDeep(errors?.transferError);
  //     const requiredFields = ["URL", "Description"];
  //     if (transfer_policy?.useTix) {
  //       map(transfer_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(transfer_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         transferError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 12) {
  //     let updateError = cloneDeep(errors?.resellError);
  //     const requiredFields = ["URL", "Description"];
  //     if (resell_policy?.useTix) {
  //       map(resell_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(resell_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         resellError: updateError,
  //       })
  //     );
  //     return isError;
  //   }
  //   return isError;
  // };



  // const errorProductHandle = () => {
  //   let isError = false;
  //   if (currentStep == 1) {
  //     let updateError = cloneDeep(errors?.step1Error);
  //     const requiredFields = [
  //       "name",
  //       "category",
  //       "brand_id",
  //       "subcategory",
  //       // "description",
  //       "location_id",
  //     ];
  //     map(step1Details, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         updateError[key] = isEmpty(step);
  //         if (!isError && isEmpty(step)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         step1Error: updateError,
  //       })
  //     );
  //   } else if (currentStep == 2) {
  //     let updateError = cloneDeep(errors?.imageError);
  //     let isError = false;
  //     updateError.image = fileData?.length <= 0;

  //     if (fileData?.length <= 0) {
  //       isError = true;
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         imageError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 3) {
  //     let updateError = cloneDeep(errors?.priceError);
  //     const requiredFields = [
  //       // "minBuy",
  //       // "maxBuy",
  //       // "retailPrice",
  //       // "sellingPrice",
  //       // "tax",
  //     ];
  //     map(priceDetails, (step, key) => {
  //       if (requiredFields.includes(key)) {
  //         const convertString =
  //           typeof step === "number" && step > 0 ? JSON.stringify(step) : step;
  //         updateError[key] = isEmpty(convertString);
  //         if (!isError && isEmpty(convertString)) {
  //           isError = true;
  //         }
  //       }
  //     });
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         priceError: updateError,
  //       })
  //     );
  //   } else if (currentStep == 6) {
  //     let updateError = cloneDeep(errors?.termsError);
  //     const requiredFields = ["URL", "Description"];
  //     if (terms?.useTix) {
  //       map(terms, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(terms, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         termsError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 7) {
  //     let updateError = cloneDeep(errors?.cancellationError);
  //     const requiredFields = ["URL", "Description"];
  //     if (cancellation_policy?.useTix) {
  //       map(cancellation_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(cancellation_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         cancellationError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 8) {
  //     let updateError = cloneDeep(errors?.returnError);
  //     const requiredFields = ["URL", "Description"];
  //     if (return_policy?.useTix) {
  //       map(return_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(return_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         returnError: updateError,
  //       })
  //     );
  //     return isError;
  //   } else if (currentStep == 9) {
  //     let updateError = cloneDeep(errors?.refundError);
  //     const requiredFields = ["URL", "Description"];
  //     if (refund_policy?.useTix) {
  //       map(refund_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = false;
  //           isError = false;
  //         }
  //       });
  //     } else {
  //       map(refund_policy, (step, key) => {
  //         if (requiredFields.includes(key)) {
  //           updateError[key] = isEmpty(step);
  //           if (!isError && isEmpty(step)) {
  //             isError = true;
  //           }
  //         }
  //       });
  //     }
  //     dispatch(
  //       setErrors({
  //         ...errors,
  //         refundError: updateError,
  //       })
  //     );
  //     return isError;
  //   }
  //   return isError;
  // };



  const handleNext = async () => {
    handleNextStep();
    // const isError =
    //   createType == "EVENT"
    //     ? await errorEventHandle()
    //     : createType == "TICKET" || createType == "ticket"
    //     ? await errorTicketHandle()
    //     : createType === "PRODUCT"
    //     ? await errorProductHandle()
    //     : createType === "SPONSER" || createType == "sponser"
    //     ? await errorSponserHandle()
    //     : createType === "registration"
    //     ? await errorRegistrationHandle()
    //     : false;
    // if (!isError) {
    //   handleNextStep();
    // }
  };

  const handleFinal = async () => {
    handleShow();
    // const isError =
    //   createType == "VERIFYDOCUMENT"
    //     ? await errorEventHandle()
    //     : createType == "TICKET" || createType == "ticket"
    //     ? await errorTicketHandle()
    //     : createType === "PRODUCT"
    //     ? await errorProductHandle()
    //     : createType === "SPONSER" || createType == "sponser"
    //     ? await errorSponserHandle()
    //     : createType === "registration"
    //     ? await errorRegistrationHandle()
    //     : false;
    // if (!isError) {
    //   handleShow();
    // }
  };

  return (
    <>
      <div className="step-content">{steps[currentStep - 1].component}</div>
      <div className="nextPreviousButton subBtn mb-4">
        {currentStep > 1 && (
          <button
            onClick={handlePrevStep}
            type="btn"
            className="fluid btn btn-primary can"
          >
            Perivious
            <img src="../../images/rightArrow.svg" alt="" />
          </button>
        )}

      
        {currentStep < steps.length &&
          (loading ? (
            <button className="btn">
              <Spinner animation="border" size="lg" /> &nbsp; Processing...
            </button>
          ) : (
            <button
              onClick={handleNext}
              type="btn"
              className="btn btn-primary sub ms-auto"
            >
              Next
              <img src="../../images/arrow-right.svg" alt="" />
            </button>
          ))}
        {currentStep > steps?.length - 1 && (
          <button
            className="btn btn-primary pull-right sub"
            onClick={handleFinal}
          >
            {updateObj &&
            updateObj?.updateForm &&
            Array.isArray(updateObj?.updateForm) &&
            updateObj?.updateForm[0].includes("edit") &&
            Object.keys(preDataObj).length
              ? "Save"
              : "Create"}

            <img src="../../images/arrow-right.svg" alt="" />
          </button>
        )}
      </div>
    </>
  );
}
export default ManageStep;


