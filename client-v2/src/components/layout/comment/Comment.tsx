import CommentBox from "./CommentBox";
import classNames from "classnames/bind";

import styles from "./comment.module.scss";
const cx = classNames.bind(styles);

const Comment = () => {
  return (
    <>
      <CommentBox />

      {/* comment item */}
      <div className="mb-4">
        <>
          <div className={cx("comment-item")}>
            <div className={cx("comment-item__avatar")}>
              <span>ql</span>
            </div>
            <div className={cx("comment-item__body")}>
              <div className={cx("name")}>
                <p>Quang linh</p>
                &nbsp;-&nbsp;
                <span>11/10/2020 21:08</span>
                <span className={cx("reply-btn")}>Trả lời</span>
              </div>

              <div className={cx("content")}>
                Em muốn lấy sỉ các máy này về bán hàng onl được không anh.
                <br />A tư vấn giúp e nhé 0393457xxxx
              </div>
            </div>
          </div>

          <div className={cx("comment-reply")}>
            <div className={cx("name")}>
              <p>Quang linh</p>
              &nbsp;-&nbsp;
              <span>11/10/2020 21:08</span>
            </div>
            <div className={cx("content")}>
              Chào anh Linh,
              <br />
              Anh Linh đang quan tới sản phẩm Máy khoan Total TH308268 cùng với
              các chính sách sỉ, Anh vui lòng để ý điện thoại, nhân viên tại
              Maydochuyendung sẽ gọi điện báo giá và tư vấn cho anh ạ.
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Comment;
