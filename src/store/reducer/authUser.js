import { createSlice } from "@reduxjs/toolkit";

export const sliceAuthUser = createSlice({
  name: "authuser",
  initialState: {
    data: null, // changed the initial state to null
  },
  reducers: {
    fetched: (state, action) => {
      // state.data = { ...state.data, [name]: value };
      state.data = action.payload.data;
    },
    logout: (state) => {
      state.data = null; // sets the data to null when the user logs out
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
