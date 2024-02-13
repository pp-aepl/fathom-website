import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step1Details: {
    name: "",
    category: "",
    subcategory: "",
    description: "",
    brand_id: "",
    location_id: "",
    city_id: [],
    formName: "",
    fields: [
      {
        key: "",
        values: [{ value: "" }, { value: "" }],
        type: "",
        isRequired: false,
      },
    ], // internal key
    registration_id: null, // for event string// []
    registration_ids: [], //for product
    is_selected: false,
  },
  priceDetails: {
    minBuy: 1,
    maxBuy: 1,
    sellingCurrency: "",
    retailCurrency: "",
    retailPrice: null, // paid
    sellingPrice: null,
    tax: null,
    isFree: false, // 'PAID','FREE,'COMINGSOON'
    // isComing:false,
  },
  selectedImages: [],
  selectedMainImages: [],
  selectedSideImages: [],
  FilesDetails: {},
  mainBanner: {},
  sideBanner: {},
  date: [],
  startDate: null,
  endDate: null,
  value: null,
  valuetwo: null,
  termsDetails: {
    terms: {
      URL: "",
      Description: "",
      useTix: false,
    },
  },
  cancellationDetails: {
    cancellation_policy: {
      URL: "",
      Description: "",
      useTix: false,
    },
  },

  returnDetails: {
    return_policy: {
      URL: "",
      Description: "",
      useTix: false,
    },
  },
  refundDetails: {
    refund_policy: {
      URL: "",
      Description: "",
      useTix: false,
    },
  },
  transferDetails: {
    transfer_policy: {
      URL: "",
      Description: "",
      useTix: false,
    },
  },
  resellerDetails: {
    resell_policy: {
      URL: "",
      Description: "",
      useTix: false,
    },
  },
  tagDetails: {
    tags: [],
  },
  latitude: 37.7749,
  longitude: -122.4194,
  venueDetails: {
    venue_details: {
      addressOne: "",
      addressTwo: "",
      country: "",
      state: "",
      city: "",
      pinCode: "",
      longitude: "",
      latitude: "",
    },
  },
  discountDetails: {
    metadata: {
      multiUse: false,
    },
    codes: [
      {
        isUsed: false,
        code: "",
        usedBy: [],
      },
    ],
  },
  subCategorylist: [],
  locationDropdwn: [],
  endTime: null,
  startTime: null,
  isPublic: false, // visibility
  visibilityDetails: {
    isPublic: false,
    team_id: "",
  },
  regisPricingDetails: {
    isFree: false,
    //product_type:"",
  },
  registerAddForm: false,
  errors: {
    step1Error: {
      name: false,
      category: false,
      // subcategory: false,
      // description: false,
      location_id: false,
    },
    venueError: {
      addressOne: "",
      country: "",
      state: "",
      // city: "",
      pinCode: "",
    },
    imageError: {
      image: false,
      mainBanner: false,
      sideBanner: false,
    },
    dateTimeError: {
      startDate: false,
      // endDate: false,
      // startTime: false,
      // endTime: false,
    },
    priceError: {
      // minBuy: false,
      // maxBuy: false,
      // retailPrice: false,
      // sellingPrice: false,
      // tax: false,
    },
    discountError: {
      codes: false,
    },
    termsError: {
      URL: "",
      Description: "",
    },
    cancellationError: {
      URL: "",
      Description: "",
    },
    returnError: {
      URL: "",
      Description: "",
    },
    refundError: {
      URL: "",
      Description: "",
    },
    transferError: {
      URL: "",
      Description: "",
    },
    resellError: {
      URL: "",
      Description: "",
    },
  },
};
const commonSlice = createSlice({
  name: "common",
  initialState: { ...initialState },
  reducers: {
    setStep1Details: (state, action) => {
      state.step1Details = action.payload;
    },

    setVisibilityDetails: (state, action) => {
      state.visibilityDetails = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action?.payload;
    },
    setRegisPricingDetails: (state, action) => {
      state.regisPricingDetails = action.payload;
    },

    setSelectedImages: (state, action) => {
      state.selectedImages = action.payload;
    },
    setSelectedMainImages: (state, action) => {
      state.selectedMainImages = action.payload;
    },
    setSelectedSideImages: (state, action) => {
      state.selectedSideImages = action.payload;
    },
    setFilesDetails: (state, action) => {
      state.FilesDetails = action.payload;
    },
    setRegisterAddForm: (state, action) => {
      state.registerAddForm = action.payload;
    },
    setMainBanner: (state, action) => {
      state.mainBanner = action.payload;
    },
    setSideBanner: (state, action) => {
      state.sideBanner = action.payload;
    },
    setPriceDetails: (state, action) => {
      state.priceDetails = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setStartDate: (state, action) => {
      // console.log(action.payload,"shadab_dev startdate")
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      // console.log(action.payload,"shadab_dev end date")
      state.endDate = action.payload;
    },
    setValue: (state, action) => {
      //   let parseValue = action.payload.includes('am')? action.payload.replace('am','') :  action.payload.replace('pm','');

      //   let hours = Number(parseValue.toString().split(':')[0])
      //   let minutes = Number(parseValue.toString().split(':')[1])
      //   let seconds = Number(parseValue.toString().split(':')[2])
      //  let  totalseconds=(hours*3600)+(minutes*60)+seconds
      //  const date = new Date(totalseconds * 1000);
      //  const timestamp = Math.floor(date.getTime() / 1000)
      const timestamp = action.payload;

      state.value = action.payload;
      state.startTime = timestamp;
    },
    setValuetwo: (state, action) => {
      // let parseValue2 = action.payload.includes('am')?action.payload.replace('am','') : action.payload.replace('pm','');

      //   let hours = Number(parseValue2.toString().split(':')[0])
      //   let minutes = Number(parseValue2.toString().split(':')[1])
      //   let seconds = Number(parseValue2.toString().split(':')[2])
      //  let  totalseconds=(hours*3600)+(minutes*60)+seconds
      //  const date = new Date(totalseconds * 1000);
      //  const timestampvalueTwo = Math.floor(date.getTime() / 1000)
      const timestampvalueTwo = action.payload;

      state.valuetwo = action.payload;
      state.endTime = timestampvalueTwo;
    },
    setTermsDetails: (state, action) => {
      state.termsDetails = action.payload;
    },
    setCancellationDetails: (state, action) => {
      state.cancellationDetails = action.payload;
    },
    setReturnDetails: (state, action) => {
      state.returnDetails = action.payload;
    },
    setRefundDetails: (state, action) => {
      state.refundDetails = action.payload;
    },
    setTransferDetails: (state, action) => {
      state.transferDetails = action.payload;
    },
    setResellerDetails: (state, action) => {
      state.resellerDetails = action.payload;
    },
    setTagDetails: (state, action) => {
      state.tagDetails = action.payload;
    },
    setVenueDetails: (state, action) => {
      state.venueDetails = action.payload;
    },
    setDiscountDetails: (state, action) => {
      state.discountDetails = action.payload;
    },
    setSubCategorylist: (state, action) => {
      state.subCategorylist = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
      state.venueDetails.venue_details = {
        ...state.venueDetails.venue_details,
        latitude: action.payload,
      };
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
      state.venueDetails.venue_details = {
        ...state.venueDetails.venue_details,
        longitude: action.payload,
      };
    },
    setLocationDropDown: (state, action) => {
      state.locationDropdwn = action.payload;
    },
    resetInitalState: () => initialState,
  },
});

/**
 * Actions
 */
export const {
  setStep1Details,
  setVisibilityDetails,
  setRegisPricingDetails,
  setSelectedImages,
  setSelectedMainImages,
  setSelectedSideImages,
  setFilesDetails,
  setMainBanner,
  setSideBanner,
  setPriceDetails,
  setDate,
  setStartDate,
  setEndDate,
  setValue,
  setValuetwo,
  setTermsDetails,
  setCancellationDetails,
  setReturnDetails,
  setRefundDetails,
  setTransferDetails,
  setResellerDetails,
  setTagDetails,
  setVenueDetails,
  setDiscountDetails,
  resetInitalState,
  setSubCategorylist,
  setLatitude,
  setLongitude,
  setLocationDropDown,
  setErrors,
  setRegisterAddForm,
} = commonSlice.actions;

/**
 * Reducers
 */
export default commonSlice.reducer;
