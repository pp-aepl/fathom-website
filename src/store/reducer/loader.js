import { createSlice } from "@reduxjs/toolkit";

export const sliceloader = createSlice({
  name: "loader",
  initialState: {
    data: false,
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

const { fetched } = sliceloader.actions;

export const SetloaderData = (data) => async (dispatch) => {
  dispatch(fetched({ data }));
};

export default sliceloader.reducer;
