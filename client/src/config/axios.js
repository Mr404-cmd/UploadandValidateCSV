import axios from "axios";
import { server } from "./keys";

export const userInstance = axios.create({
  baseURL: `${server}/`,
  headers:{
    "Content-Type": "multipart/form-data"
  },
  withCredentials: true,
});
