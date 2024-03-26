/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { apiURl } from "../store/actions";
import axios from "axios";
import { BASE_CONFIG } from "../Config";

let refreshCallInProgress = false;
let logoutInProgress = false;

// to make an api call using axios
export const api = async ({ url, method, body }) => {
  try {
    return await axios({
      method,
      url: BASE_CONFIG.BASE_URL + url,
      data: body,
    }).then((response) => response);
  } catch (error) {
    throw error;
  }
};

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    config["headers"]["version"] = "2.0";
    if (!config.url.includes(apiURl.login)) {
      config["headers"]["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      config["headers"]["roleId"] = `${localStorage.getItem("roleId")}`;
      config["headers"]["accessToken"] = `${localStorage.getItem(
        "accessToken"
      )}`;
    }

    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response ? response.data : { status: false };
  },
  (error) => {
    if (error?.response) {
      // If there is a response, handle specific status codes
      const { status, data } = error.response;
      if (status === 403) {
        // Handle 403 error
        // unique toastId to differentiate toasts
        // RefreshTokenService();
      } else if (status === 405) {
        // Handle 405 error
        console.log(data.message);
        // Your current session has expired. Please log in again.
        toast.error(data.message);
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/login";
        }, 2000);
      }
      // } else {
      //   // For other errors or if there is no specific handling, reject with the error object
      //   console.log(data, "response ==== data");
      //   return Promise.reject({ status: status, error: data });
      // }
    }
    // If there is no response or if there's an unhandled error, reject with the original error object
    return Promise.reject(error);
  }
);

export const uploadvideo = async ({ url, method, body }) => {
  let baseUrl = localStorage.getItem("baseUrl");

  // export const uploadvideo = async ({
  //   body,
  //   headers = {},
  //   method,
  //   signal,
  //   url,
  //   formData = false,
  // }) => {

  try {
    return await axios({
      method,
      // formData : false,
      url: BASE_CONFIG.BASE_URL + url,
      // url: BASE_CONFIG.IMAGE_BASE_URL + url,
      // data: body ? (formData ? body : JSON.stringify(body)) : null,
      data: JSON.stringify(body),
    }).then((response) => response);
  } catch (error) {
    throw Error(error);
  }

  // try {
  //   return await fetch(BASE_CONFIG.IMAGE_BASE_URL + url, {
  //     method,
  //     headers,
  //     body: body ? (formData ? body : JSON.stringify(body)) : null,
  //     signal,
  //   })
  //     .then((response) => {
  //       if (response.status === 403) {

  //       } else if (response.status === 401) {
  //       }
  //       return response.clone().json();
  //     })
  //     .then((data) => data);
  // } catch (error) {
  //   throw Error(error);
  // }
};

export const allApi = async ({
  body,
  headers = {},
  method,
  signal,
  url,
  formData = false,
}) => {
  try {
    return await fetch(url, {
      method,
      headers,
      body: body ? (formData ? body : JSON.stringify(body)) : null,
      signal,
    })
      .then((response) => {
        if (response.url.includes("X-Amz-Credential")) {
          return true;
        }
        return response.clone().json();
      })
      .then((data) => {
        console.log({ data });
        return data;
      });
  } catch (error) {
    throw Error(error);
  }
};

export const getAwsImageUrl = async (image, folder = "unprocessed") => {
  try {
    if (typeof image === "string" || !(image instanceof Blob)) {
      return image;
    }
    const isVideo =
      image.type.startsWith("video") || /\.(?:mp4|m4v|webm|ogg)$/i.test(image);
    let fd = new FormData();
    fd.append("file", image);
    let url = `${BASE_CONFIG.AWS_URL}/v1/unprocessed`;
    const data = await axios.post(url, fd);
    console.log(data, "data");
    let { Bucket = "", Key = "", Location = "" } = data?.data?.file;
    // let uploadUrl = isVideo
    //   ? data?.result?.video?.video_uploadUrl
    //   : data?.result?.image?.image_uploadUrl;
    // let displayUrl = isVideo
    //   ? data?.result?.video?.video_Url
    //   : data?.result?.image?.image_url;
    // await getFinalUrl(image, uploadUrl, folder);
    let obj = { Bucket, Key, Location };
    return obj;
  } catch (error) {
    throw Error(error);
  }
};

const getFinalUrl = async (image, urls, folder) => {
  try {
    return await allApi({
      url: `${urls}`,
      method: "PUT",
      formData: true,
      body: image,
    }).then((data) => {
      console.log({ data });
      return true;
    });
    // return true;
  } catch (error) {
    throw Error(error);
  }
};

export default api;
