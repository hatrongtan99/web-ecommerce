import axiosClient from "./axiosConfig";

export const getFilter = () => {
  return axiosClient.get("/category/filter");
};
