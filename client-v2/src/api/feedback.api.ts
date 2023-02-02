import axiosClient from "./axiosConfig";

export const getFeedback = (id: string, params: any) => {
  return axiosClient.get(`/feedback/${id}`, { params });
};

export const newFeedback = (id: string, newFeedback: any) => {
  return axiosClient.post(`/feedback/${id}`, newFeedback);
};
