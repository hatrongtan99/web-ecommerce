import classNames from "classnames/bind";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Button from "~components/custom/button/Button";
import styles from "./comment.module.scss";
import type { NewComment } from "~types/comment.type";
import { newComment } from "~api/comment.api";
const cx = classNames.bind(styles);

const CommentBox = ({ id }: { id: string }) => {
  // const [newComment, setNewComment] = useState<NewComment>({content, commentId, email, name});
  const mutation = useMutation((data: NewComment) => newComment(id, data));

  return (
    <form className={cx("wrapper")}>
      <h3>BÌNH LUẬN SẢN PHẨM</h3>
      <div className={cx("comment-box")}>
        <div className={cx("comment-text")}>
          <textarea
            className="form-control"
            placeholder="Bình luận của bạn"
            name="content"
            required
          />
        </div>

        <div className={`row`}>
          <div className="col-5">
            <input
              className="form-control"
              placeholder="Tên của bạn"
              name="name"
              required
            />
          </div>
          <div className="col-5">
            <input
              className="form-control"
              placeholder="Email của bạn"
              name="email"
              required
            />
          </div>
          <div className="col-2">
            <Button
              size="sm"
              style={{ padding: "6px 4px" }}
              type="submit"
              onClick={() => {}}
            >
              Gửi bình luận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
