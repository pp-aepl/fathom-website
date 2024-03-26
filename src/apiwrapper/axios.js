import axios from "axios";
import { BASE_CONFIG } from "../Config";

const BLOG_URL = BASE_CONFIG.BASE_URL;

export const getDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.get(`${BLOG_URL}${URL}`, data, {
    headers: headers,
  });
};

export const postDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.post(`${BLOG_URL}${URL}`, data, {
    headers: headers,
  });
};

export const putDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.put(`${BLOG_URL}${URL}`, data, {
    headers: headers,
  });
};

export const DeleteDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.delete(`${BLOG_URL}${URL}`, {
    headers: headers,
    data,
  });
};


const BASE_URL = BASE_CONFIG.BASE_URL;

export const getuserDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.get(`${BASE_URL}${URL}`, data, {
    headers: headers,
  });
};

export const postuserDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.post(`${BASE_URL}${URL}`, data, {
    headers: headers,
  });
};

export const putuserDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.put(`${BASE_URL}${URL}`, data, {
    headers: headers,
  });
};

export const DeleteuserDataApi = async (URL, data = {}) => {
  const headers = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return await axios.delete(`${BASE_URL}${URL}`, {
    headers: headers,
    data,
  });
};
