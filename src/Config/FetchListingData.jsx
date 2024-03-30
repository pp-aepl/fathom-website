import { API } from "../apiwrapper";
import { apiURl } from "../store/actions";
import { SetloaderData } from "../store/reducer";
import {
  SetCategories,
  SetConfigData,
  SetGraphData,
  SetRules,
} from "../store/reducer/ConfigData";

export const makeSearchString = (filter) => {
  const searchParams = new URLSearchParams();
  for (const key in filter) {
    if (filter[key]) {
      searchParams.append(key, filter[key]);
    }
  }
  return searchParams.toString();
};

export const fetchApplicationList =
  (body = {}, query = {}) =>
  async (dispatch) => {
    try {
      dispatch(SetloaderData(true));
      let url = `${apiURl.applications}/list`;
      if (query) {
        const searchString = makeSearchString(query);
        url = searchString ? `${url}?${searchString}` : url;
      }
      const data = await API({
        url: url,
        method: "POST",
        body: { ...body },
      });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(SetloaderData(false));
    }
  };

export const fetchAllRulesList =
  (body = {}, query = {}) =>
  async (dispatch) => {
    try {
      dispatch(SetloaderData(true));
      let url = `${apiURl.rules}/list`;
      if (query) {
        const searchString = makeSearchString(query);
        url = searchString ? `${url}?${searchString}` : url;
      }
      const data = await API({
        url: url,
        method: "POST",
        body: { ...body },
      });
      console.log(data);
      dispatch(SetRules(data?.results));
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(SetloaderData(false));
    }
  };

export const fetchAllCategories =
  (body = {}, query = {}) =>
  async (dispatch) => {
    try {
      dispatch(SetloaderData(true));
      let url = `${apiURl.forms}/list`;
      if (query) {
        const searchString = makeSearchString(query);
        url = searchString ? `${url}?${searchString}` : url;
      }
      const data = await API({
        url: url,
        method: "POST",
        body: { ...body },
      });
      console.log(data);
      dispatch(SetCategories(data?.results));
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(SetloaderData(false));
    }
  };

export const getDashboardData =
  (body = {}, query = {}) =>
  async (dispatch) => {
    try {
      dispatch(SetloaderData(true));
      let url = `${apiURl.dashboard}`;
      if (query) {
        const searchString = makeSearchString(query);
        url = searchString ? `${url}?${searchString}` : url;
      }
      const data = await API({
        url: url,
        method: "POST",
        body: { ...body },
      });
      console.log(data);
      dispatch(SetConfigData(data));
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(SetloaderData(false));
    }
  };
export const getDashboardGraphData =
  (body = {}, query = {}) =>
  async (dispatch) => {
    try {
      dispatch(SetloaderData(true));
      let url = `${apiURl.dashboard}/graph`;
      if (query) {
        const searchString = makeSearchString(query);
        url = searchString ? `${url}?${searchString}` : url;
      }
      const data = await API({
        url: url,
        method: "POST",
        body: { ...body },
      });
      console.log(data);
      let obj = data?.data;
      let arr = data?.data?.datasets?.map((ele) => {
        let label =
          ele?.label === "AWAITING_COMMODITY_PURCHASE"
            ? "Ready to be import"
            : ele?.label === "AWAITING_DIGITAL_SIGNATURE"
            ? "Under Process"
            : ele?.label === "WELCOME_LETTER_ISSUED"
            ? "Completed"
            : ele?.label === "REJECTED"
            ? "Rejected"
            : ele?.label;
        return { ...ele, label };
      });
      let updatedData = { ...obj, datasets: arr };
      dispatch(SetGraphData(updatedData));
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(SetloaderData(false));
    }
  };
