import { AxiosResponse } from "axios";
import { ListFeedback } from "~types/feedback.type";
import axiosClient from "./axiosConfig";

interface FeedbackRes extends ListFeedback {
  success: boolean;
}

export const getFeedback = (id: string, params?: any) => {
  return axiosClient
    .get<never, AxiosResponse<FeedbackRes>>(`/feedback/${id}`, {
      params,
    })
    .then((data) => data.data);
};

export const newFeedback = (id: string, newFeedback: any) => {
  return axiosClient
    .post(`/feedback/${id}`, newFeedback)
    .then((data) => data.data);
};
