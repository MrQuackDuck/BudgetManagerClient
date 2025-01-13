import axios from "axios";
import { API_URL } from "../lib/globals";
import { getFromLocalStorage } from "../lib/utils";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getFromLocalStorage<string>("token")}`;
  return config;
});