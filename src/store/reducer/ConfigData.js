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
  },
});

const { fetched, setRules, setCategories } = sliceConfigData.actions;

export const SetConfigData = (data) => async (dispatch) => {
  dispatch(fetched({ data }));
};

export const SetRules = (rules) => async (dispatch) => {
  dispatch(setRules({ rules }));
};

export const SetCategories = (categories) => async (dispatch) => {
  dispatch(setCategories({ categories }));
};

export default sliceConfigData.reducer;
