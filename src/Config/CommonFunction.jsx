import {
  ReSetConfigData,
  logout,
  reSetPopupReducerData,
} from "../store/reducer";

export const convertToCamelCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const handleLogOut = (obj) => async (dispatch) => {
  try {
    dispatch(logout());
    dispatch(reSetPopupReducerData({}));
    dispatch(ReSetConfigData({}));
    localStorage.clear();
  } catch (error) {}
};
