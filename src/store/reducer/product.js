import { createSlice } from "@reduxjs/toolkit";

export const sliceProduct = createSlice({
  name: "Product",
  initialState: {
    ecommerceRequest: {},
  },
  reducers: {
    createEcommerceData: (state, { payload }) => {
      state.ecommerceRequest = payload?.data;
    },

    storecreateType: (state, { payload }) => {
      state.createType = payload?.data;
    },
  },
});
// Action creators are generated for each case reducer function
const {
  storecreateType,

  createEcommerceData,
} = sliceProduct.actions;

export const CreateEcommerceData = (data) => async (dispatch) => {
  dispatch(createEcommerceData({ data }));
};
export const createType = (data) => async (dispatch) => {
  console.log(data)
  dispatch(storecreateType({ data }));
};

export default sliceProduct.reducer;
