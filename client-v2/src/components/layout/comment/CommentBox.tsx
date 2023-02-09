import { useState, ChangeEvent } from "react";
import classNames from "classnames/bind";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "~components/custom/button/Button";
import styles from "./comment.module.scss";
import type { NewComment } from "~types/comment.type";
import { newComment } from "~api/comment.api";
import Spinner from "~components/common/spiner/Spiner";
const cx = classNames.bind(styles);

const CommentBox = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<NewComment>({
    content: "",
    email: "",
    user: "",
  });

  const mutation = useMutation((data: NewComment) => newComment(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment-list", id]);
    },
  });

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmitNewComment = (e: MouseEvent) => {
    e.preventDefault();
    mutation
      .mutateAsync(comment)
      .then(() => {
        setComment({
          content: "",
          email: "",
          user: "",
        });
      })
      .catch((err) => {});
  };

  return (
    <>
      {mutation.isLoading && <Spinner />}
      <form className={cx("wrapper")}>
        <h3>BÌNH LUẬN SẢN PHẨM</h3>
        <div className={cx("comment-box")}>
          <div className={cx("comment-text")}>
            <textarea
              className="form-control"
              placeholder="Bình luận của bạn"
              name="content"
              onChange={handleChangeInput}
              value={comment.content}
              required
            />
          </div>

          <div className={`row`}>
            <div className="col-5">
              <input
                className="form-control"
                placeholder="Tên của bạn"
                name="user"
                onChange={handleChangeInput}
                value={comment.user}
                required
              />
            </div>
            <div className="col-5">
              <input
                className="form-control"
                placeholder="Email của bạn"
                name="email"
                onChange={handleChangeInput}
                value={comment.email}
                required
              />
            </div>
            <div className="col-2">
              <Button
                size="sm"
                style={{ padding: "6px 4px" }}
                type="submit"
                onClick={(e: any) => handleSubmitNewComment(e)}
              >
                Gửi bình luận
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CommentBox;
