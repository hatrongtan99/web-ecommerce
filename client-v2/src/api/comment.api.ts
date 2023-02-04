import { AxiosResponse } from "axios";
import { NewComment, CommentList } from "~types/comment.type";
import axiosClient from "./axiosConfig";

interface CommentRes extends CommentList {
  success: boolean;
}

export const getCommentProduct = (id: string, params?: any) => {
  return axiosClient
    .get<never, AxiosResponse<CommentRes>>(`/comment/${id}`, {
      params,
    })
    .then((data) => data.data);
};

export const newComment = (id: string, comment: NewComment) => {
  return axiosClient.post(`/commnet/${id}`, comment).then((data) => data.data);
};
