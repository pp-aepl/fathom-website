import { createSlice } from "@reduxjs/toolkit";

export const sliceConfigData = createSlice({
  name: "configData",
  initialState: {
    data: {},
    graphData: {},
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
    setGraphData: (state, { payload }) => {
      state.graphData = payload.data;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.categories;
    },
    reSetConfigData: (state) => {
      Object.assign(state, sliceConfigData.getInitialState());
    },
  },
});

const { fetched, setRules, setCategories, reSetConfigData, setGraphData } =
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
export const SetGraphData = (data) => async (dispatch) => {
  dispatch(setGraphData({ data }));
};
export const ReSetConfigData = () => async (dispatch) => {
  dispatch(reSetConfigData());
};
export default sliceConfigData.reducer;
