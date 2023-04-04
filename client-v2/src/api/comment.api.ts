import { AxiosResponse } from "axios";
import { NewComment, CommentList } from "~types/comment.type";
import axiosClient from "./axiosConfig";

export const getCommentProduct = (id: string, params?: any) => {
    return axiosClient
        .get<never, AxiosResponse<{ success: boolean } & CommentList>>(
            `/comment/${id}`,
            {
                params,
            }
        )
        .then((data) => data.data);
};

export const newComment = (id: string, comment: NewComment) => {
    return axiosClient
        .post(`/comment/${id}`, comment)
        .then((data) => data.data);
};
