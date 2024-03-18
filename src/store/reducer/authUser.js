import { createSlice } from "@reduxjs/toolkit";

export const sliceAuthUser = createSlice({
  name: "authUser",
  initialState: {
    data: null,
  },
  reducers: {
    fetched: (state, action) => {
      state.data = action.payload.data;
    },
    logout: (state) => {
      state.data = sliceAuthUser.getInitialState().data;
    },
  },
});

export const { fetched, logout } = sliceAuthUser.actions;

export const SetAuthUserData = (data) => (dispatch) => {
  // console.log("Dispatching fetched with data:", data);
  // if (!data) throw Error("missing Data parameter");
  // console.log("SetAuth", data);
  dispatch(fetched({ data }));
};

export const LogoutUser = () => (dispatch) => {
  dispatch(logout({}));
};

export default sliceAuthUser.reducer;
