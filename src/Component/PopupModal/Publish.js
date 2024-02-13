import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer/index";
function Publish() {
  const dispatch = useDispatch();
  const { createType } = useSelector((state) => state?.Product);
  const { PopupReducer } = useSelector((state) => state);
  const { showModal = false } = PopupReducer?.modal;

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "PUBLISH", showModal: false }));
  };

  // update create api
  const onSubmit = async (e, typeSubmit) => {
    e.preventDefault();

    // try {
    //   let edit =
    //     updateId && updateId?.updateForm && Array.isArray(updateId?.updateForm);

    //   let url;
    //   let productUrl = edit
    //     ? `${adminApiUrl.product}/${updateId?.updateForm[1]}`
    //     : `${adminApiUrl.product}`;
    //   let eventUrl = edit
    //     ? `${adminApiUrl.getBrand}/${updateId?.updateForm[1]}`
    //     : `${adminApiUrl.getBrand}`;

    //   let pricePayload;
    //   let imagePayload;
    //   let discountPayload;
    //   let currency = locationList.find(
    //     (x) => x?._id == step1Details?.location_id
    //   ).currency;

    //   pricePayload = {
    //     ...priceDetails,
    //     sellingCurrency: currency,
    //     retailCurrency: currency,

    //   };
    //   discountPayload = {...discountDetails};
    //   console.log(discountPayload,'discountPayloaddiscountPayload')

    //   if (createType === "event" || createType === "EVENT") {
    //     let filterArray = fileData?.map((ele) => {
    //       return ele.url;
    //     });
    //     let filterArrayMain = fileMainData2?.map((ele) => {
    //       return ele.url;
    //     });
    //     let filterArraySide = fileSideData2?.map((ele) => {
    //       return ele.url;
    //     });
    //     imagePayload = {
    //       images: filterArray,
    //       logo: filterArray[0],
    //       image: filterArray[0],
    //       banner: filterArray[0],
    //       mainBanner: filterArrayMain[0],
    //       sideBanner: filterArraySide[0],
    //     };
    //   } else {
    //     let filterArray = fileData?.map((ele) => {
    //       return ele.url;
    //     });
    //     imagePayload = {
    //       images: filterArray,
    //       logo: filterArray[0],
    //       image: filterArray[0],
    //       banner: filterArray[0],
    //     };
    //   }

    //   let payload =
    //     createType === "event" || createType === "EVENT"
    //       ? {
    //           ...ecommerceRequest,
    //           venue_details: venueDetails?.venue_details,
    //           startDate: startDate ? startDate : null,
    //           startTime: startTime ? startTime : null,
    //           endDate: endDate ? endDate : null,
    //           endTime: endTime ? endTime : null,
    //           ...step1Details,
    //           ...imagePayload,
    //         }
    //       : {
    //           ...ecommerceRequest,
    //           startDate: startDate ? startDate : null,
    //           startTime: startTime ? startTime : null,
    //           endDate: endDate ? endDate : null,
    //           endTime: endTime ? endTime : null,
    //           ...step1Details,
    //           ...imagePayload,
    //           ...pricePayload,
    //           ...discountPayload

    //         };

    //   payload.registration_id =
    //     createType === "event" || createType === "EVENT"
    //       ? [...payload.registration_ids]
    //       : payload.registration_id;
    //   delete payload.isValid;
    //   delete payload.fields;
    //   delete payload.registration_ids;
    //   if (createType === "product" || createType === "PRODUCT") {
    //     url = productUrl;
    //     payload.type = "product";
    //     if (payload.isFree === true) {
    //       payload.retailPrice = 0;
    //       payload.sellingPrice = 0;
    //       payload.tax = 0;
    //     }
    //     payload.isTaxApplicableonProduct =false
    //     delete payload.codes;
    //     delete payload.metadata;
    //     if (createType === "registration") {
    //       payload.product_type = "REGISTRATION";
    //     } else {
    //       payload.product_type = "PRODUCT";
    //     }
    //     payload.brand_type = "product";
    //     payload.creator_id = `${AuthUser?.data?._id}`;
    //     if (typeSubmit === "create") {
    //       payload.status = "ACTIVE";
    //     } else {
    //       payload.status = "INACTIVE";
    //     }
    //   } else if (
    //     createType === "ticket" ||
    //     createType === "TICKET" ||
    //     createType === "registration"
    //   ) {
    //     url = productUrl;
    //     if (payload.isFree === true) {
    //       payload.retailPrice = 0;
    //       payload.sellingPrice = 0;
    //       payload.tax = 0;
    //     }
    //     payload.isTaxApplicableonProduct =false

    //     payload.brand_type = "collectable";
    //     if (createType === "registration") {
    //       payload.product_type = "REGISTRATION";
    //     } else {
    //       payload.product_type = "TICKET";
    //     }
    //     delete payload.codes;
    //     delete payload.metadata;
    //     payload.type = "collectable";
    //     payload.creator_id = `${AuthUser?.data?._id}`;
    //     if (typeSubmit === "create") {
    //       payload.status = "ACTIVE";
    //     } else {
    //       payload.status = "INACTIVE";
    //     }
    //   } else if (createType === "event" || createType === "EVENT") {
    //     // mange save and perivious
    //     if (typeSubmit === "create") {
    //       payload.status = "ACTIVE";
    //     } else {
    //       payload.status = "INACTIVE";
    //     }
    //     payload.brand_type = "event";
    //     payload.makeCreatorBrandAdmin = true;
    //     url = eventUrl;
    //   } else if (createType === "sponser" || createType === "SPONSER") {
    //     url = productUrl;

    //     if (payload.isFree === true) {
    //       payload.retailPrice = 0;
    //       payload.sellingPrice = 0;
    //       payload.tax = 0;
    //     }
    //     payload.isTaxApplicableonProduct =false
    //     payload.brand_type = "voucher";
    //     payload.type = "voucher";
    //     if (createType === "registration") {
    //       payload.product_type = "REGISTRATION";
    //     } else {
    //       payload.product_type = "VOUCHER";
    //     }
    //     payload.creator_id = `${AuthUser?.data?._id}`;
    //     if (typeSubmit === "create") {
    //       payload.status = "ACTIVE";
    //     } else {
    //       payload.status = "INACTIVE";
    //     }
    //   }

    //   console.log(payload, "payloadEcommmerce==>");

    //   dispatch(SetloaderData(true));
    //   await CLIENTADMINAPI({
    //     url: url,
    //     method:
    //       createType === "event" && edit ? "PUT" : edit ? "PATCH" : "POST",
    //     body: payload,
    //     formData: false,
    //   }).then((data) => {
    //     if (data?.status || data?.status === true || data?.success) {
    //       dispatch(SetloaderData(false));
    //       toast.success(data.message);
    //       handleClosePopup();

    //       // if (
    //       //   (createType === "event" || createType === "EVENT") &&
    //       //   data?.response?.isPublic === false
    //       // ) {
    //       //   updateTeamModal(data?.response ? data?.response : data, `edit`);
    //       // } else {
    //         navigate.back();
    //         navigate.push(`/admin/dashboard/${createType}`);
    //         navigate.refresh();

    //       // }
    //       // only registartion form
    //       if (createType === "registration") {
    //         handleSubmit(data?.response ? data?.response : data);
    //       }
    //     } else {
    //       dispatch(SetloaderData(false));
    //       toast.warn(data.message);
    //       // submitButton.disabled = false;
    //     }
    //   });
    //   // } else {
    //   //   setErrors(err);
    //   //   submitButton.disabled = false;
    //   // }
    // } catch (error) {
    //   console.log("ADMINAPI=>", error);
    //   toast.error(error.message);
    //   dispatch(SetloaderData(false));
    //   // submitButton.disabled = false;
    // }
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
        {/* <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="p-5">
          <div className="">
            <h3>
              {`Do you want to publish this ${createType}`}
              {/* {createType
                ? createType.charAt(0).toU() + createType.slice(1)
                : ""}{" "}
              ? */}
            </h3>
            <button
              className={"closeBtn"}
              onClick={() => handleClosePopup(false)}
            >
              {" "}
              <img src="../../../images/closeBtn.svg" alt="" />{" "}
            </button>
          </div>
          <div
            className={`d-flex align-items-center justify-content-around pt-4 ${"saveBtn"}`}
          >
            <button onClick={(e) => onSubmit(e, "saveForLater")}>
              Save for Later
            </button>{" "}
            <button onClick={(e) => onSubmit(e, "create")}>Yes</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Publish;
