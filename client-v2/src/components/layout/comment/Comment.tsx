import CommentBox from "./CommentBox";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import styles from "./comment.module.scss";
import { getCommentProduct } from "~api/comment.api";
const cx = classNames.bind(styles);

const Comment = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery(["comment-list", id], () =>
    getCommentProduct(id, { page: 1, pageSize: 1 })
  );

  const dFormat = (d: Date) => {
    return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString("en-GB");
  };

  return (
    <>
      <CommentBox id={id} />

      {/* comment item */}
      {isSuccess ? (
        <div className="mb-4">
          {data?.comments?.map((comment) => (
            <div key={comment._id}>
              <div className={cx("comment-item")}>
                <div className={cx("comment-item__avatar")}>
                  <span>{comment.email.slice(0, 2)}</span>
                </div>
                <div className={cx("comment-item__body")}>
                  <div className={cx("name")}>
                    <p>{comment.user}</p>
                    &nbsp;-&nbsp;
                    <span>{dFormat(new Date(comment.created))}</span>
                    <span className={cx("reply-btn")}>Trả lời</span>
                  </div>

                  <div className={cx("content")}>{comment.content}</div>
                </div>
              </div>

              {comment.reply.map((rep: any, index) => (
                <div className={cx("comment-reply")} key={index}>
                  <div className={cx("name")}>
                    <p>{rep.name}</p>
                    &nbsp;-&nbsp;
                    <span>{dFormat(new Date(rep.created))}</span>
                  </div>
                  <div className={cx("content")}>{rep.content}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Comment;
