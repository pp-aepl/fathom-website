import { toast } from "react-toastify";
import { apiURl } from "../store/actions";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { API } from ".";
import { SetLocationList } from "../store/reducer";
import { store } from "../store/storeIndex";
import { BASECONFIG } from "../Config";

let refreshCallInProgress = false;
let logoutInProgress = false;

// to make an api call using axios
export const api = async ({ url, method, body }) => {
  try {
    return await axios({
      method,
      url:BASECONFIG.BASE_URL + url,
      data: body,
      
    }).then((response) => response);
  } catch (error) {
    throw Error(error);
  }
};

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    config["headers"]["version"] = "2.0"
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
    if (error?.response?.status === 403) {
      // unique toastId to differentiate toasts
     
      // RefreshTokenService();
    }else if(error?.response?.status === 405) {
      console.log(error.response.data.message)
      // Your current session has expired. Please log in again.
      toast.error(error.response.data.message)
      setTimeout(() => {
        localStorage.clear()
        window.location.href = "/login";
      }, 2000);
    
    }
    // Handle response error here
    // handleMessage(error?.response?.data?.message)
    return Promise.reject(error);
  }
);



// export const RefreshTokenService = async () => {
//   if (refreshCallInProgress) {
//     return;
//   }
//   refreshCallInProgress = true;
//   let tokenDetails = localStorage.getItem("token");
//   if (tokenDetails) {
//     const decoded = jwtDecode(tokenDetails); 
//     const currentTime = Math.ceil(Date.now() / 1000);

//     if (typeof decoded.exp !== "undefined" && decoded.exp < currentTime) {
//       try {
//         await api({
//           url: apiURl.refresh,
//           method: "GET",
//         }).then((data) => {
//           if (data?.status) {
//             toast.success(data.message);
//             tokenDetails = data?.data?.token;
//             localStorage.setItem("token", data?.data?.token);
//             localStorage.setItem("accessToken", data?.data?.accessToken);
//             refreshCallInProgress = false;
//             window.location.reload();

//             // window.location.href = "";
//           } else {
       
//           }
//         });
//       } catch (error) {
//         refreshCallInProgress = false;
      
//       }
//     }else {
//       // code for logout and navigate to 
//     }
//   }
//   return tokenDetails;
// };


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
      url:BASECONFIG.BASE_URL+ url,
      // url: BASECONFIG.IMAGE_BASE_URL + url,
      // data: body ? (formData ? body : JSON.stringify(body)) : null,
      data: JSON.stringify(body),
    }).then((response) => response);
  } catch (error) {
    throw Error(error);
  }

  // try {
  //   return await fetch(BASECONFIG.IMAGE_BASE_URL + url, {
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
  refresh = false,
}) => {
  // let token = !refresh ? await RefreshTokenService() : "";

  // headers["Access-Control-Allow-Origin"] = "*";
  // headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  // headers["roleId"] = `${localStorage.getItem("roleId")}`;
  // headers["accessToken"] = `${localStorage.getItem("accessToken")}`;
  try {
    return await fetch(url, {
      method,
      headers,
      body: body ? (formData ? body : JSON.stringify(body)) : null,
      signal,
    })
      .then((response) => {
        if (response.status === 403) {

        } else if (response.status === 401) {
        }
        return response.clone().json();
      })
      .then((data) => data);
  } catch (error) {
    throw Error(error);
  }
};



export const getAwsImageUrl = async (image, folder = "user") => {
  console.log("🚀 ~ file: api.js:282 ~ getAwsImageUrl ~ image:", image)
  try {
    
    if (typeof image === "string") {
      return image;
    }

   
    let fd = new FormData();
    if(image.type === 'video/mp4'){
      fd.append("video", image);
    }else {
      fd.append("image", image);
    }
    let imgUrl = await api({
      url: `${BASECONFIG.AWS_URL}/${folder}`,
      method: "POST",
      formData: true,
      body: fd,
    }).then((data) => {
      return data?.data?.image.Location;
    });
    return imgUrl;
  } catch (error) {
    throw Error(error);
  }
};

export const upload = async (data, url) => {
  const formdata = new FormData();
  formdata.append("image", data);
  const requestOptions = {
    method: "PUT", // Or 'PUT', 'DELETE', etc.
    headers: {
      "Content-Type": "image/png", // Or the appropriate file type
      Authorization: `Bearer ${localStorage.getItem("token")} `,
      accessToken: `${localStorage.getItem("accessToken")}`,
      roleId: `${localStorage.getItem("roleId")}`,
    },

    body: formdata,
    redirect: "follow",
  };

  fetch(`${url}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

//s3 bucket image url

// export const getMediaLocation = async () => {
//   try {
//     let URL = `${apiURl.getMediaLocation}`;
//     await uploadvideo({
//       url: URL,
//       method: "GET",
//       formData: false,
//     }).then((res) => {
//       if (res.status) {
//         return res.result;
//       }
//     });
//   } catch (error) {
//     toast.error(error.message);
//   }
// };
export const getMediaLocation = async () => {
  try {
    let URL = `${apiURl.getMediaLocation}`;
    const res = await uploadvideo({
      url: URL,
      method: "GET",
      formData: false,
    });
    if (res.status) {
      return res.result;
    } else {
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};




export default api;
