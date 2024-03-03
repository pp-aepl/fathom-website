import { createSlice } from "@reduxjs/toolkit";

export const slicepopupReducer = createSlice({
  name: "PopupReducer",
  initialState: {
    modal: {
      modalType: "",
      showModal: false,
      showConfirmModal:false,
      successModal:false,
      proceedModal:false,
      rejectModal:false,
      reasonModal:false,
      exceptionModal:false,
      proceedCommodityModal:false,
      murabahaSuccessModal:false,
      agentModal:false,
      disbursedModal:false,
      duplicatedModal:false,
      genratedModal:false,
      murabahaModal:false,
      scanModal:false,
      buyModal: false,
      ticketData: {},
      updateId: [],
      type:''
    },
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.modal = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
const { fetched } = slicepopupReducer.actions;

export const SetpopupReducerData = (data) => async (dispatch) => {
  console.log(data,'00000')
  if (!data) throw Error("missing Data parameter");
  dispatch(fetched({ data }));
};

export default slicepopupReducer.reducer;
