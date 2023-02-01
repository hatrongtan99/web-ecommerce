import classNames from "classnames/bind";
import Button from "~components/custom/button/Button";
import styles from "./comment.module.scss";
const cx = classNames.bind(styles);

const CommentBox = () => {
  return (
    <div className={cx("wrapper")}>
      <h3>BÌNH LUẬN SẢN PHẨM</h3>
      <div className={cx("comment-box")}>
        <div className={cx("comment-text")}>
          <textarea className="form-control" placeholder="Bình luận của bạn" />
        </div>

        <div className={`row`}>
          <div className="col-5">
            <input className="form-control" placeholder="Tên của bạn" />
          </div>
          <div className="col-5">
            <input className="form-control" placeholder="Email của bạn" />
          </div>
          <div className="col-2">
            <Button size="sm" style={{ padding: "6px 4px" }}>
              Gửi bình luận
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
