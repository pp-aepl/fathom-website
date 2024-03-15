import { API } from "../apiwrapper";
import { apiURl } from "../store/actions";
import { SetloaderData } from "../store/reducer";

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
      let url = `${apiURl.applications_list}`;
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
