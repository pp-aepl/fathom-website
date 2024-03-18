import { createSlice } from "@reduxjs/toolkit";

export const sliceConfigData = createSlice({
  name: "configData",
  initialState: {
    data: {},
    rules: [],
    categories: [],
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.data = payload.data;
    },
    setRules: (state, { payload }) => {
      state.rules = payload.rules;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.categories;
    },
    reSetConfigData: (state) => {
      Object.assign(state, sliceConfigData.getInitialState());
    },
  },
});

const { fetched, setRules, setCategories, reSetConfigData } =
  sliceConfigData.actions;

export const SetConfigData = (data) => async (dispatch) => {
  dispatch(fetched({ data }));
};

export const SetRules = (rules) => async (dispatch) => {
  dispatch(setRules({ rules }));
};

export const SetCategories = (categories) => async (dispatch) => {
  dispatch(setCategories({ categories }));
};

export const ReSetConfigData = () => async (dispatch) => {
  dispatch(reSetConfigData());
};
export default sliceConfigData.reducer;
