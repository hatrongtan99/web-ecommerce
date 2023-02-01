import { NewComment, CommentList } from "~types/comment.type";
import axiosClient from "./axiosConfig";

interface CommentRes extends CommentList {
  success: boolean;
}

export const getCommentProduct = (id: string, params?: any) => {
  return axiosClient.get<never, CommentRes>(`/comment/${id}`, { params });
};

export const newComment = (id: string, comment: NewComment) => {
  return axiosClient.post(`/commnet/${id}`, comment);
};
