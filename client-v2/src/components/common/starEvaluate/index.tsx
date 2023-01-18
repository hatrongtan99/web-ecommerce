import classNames from "classnames/bind";
import { AiFillStar } from "react-icons/ai";

import styles from "./starEvaluate.module.scss";

const cx = classNames.bind(styles);

const StarEvaluate = ({ detail }: { detail: any }) => {
  const { rating, sold, totalReviews } = detail;
  return (
    <div className={cx("star-wrapper")}>
      <div className={cx("rating")}>
        <p>{rating}</p>
      </div>
      <div className={cx("star")}>
        {new Array(5).fill(0).map((star, index) => (
          <AiFillStar
            key={index}
            size={20}
            color={index + 1 <= rating ? "#f4c91f" : "#ddd"}
          />
        ))}
      </div>

      <span className={cx("separate")}></span>

      <div className={cx("rating")}>
        <p>{totalReviews}</p>
        <span>&nbsp; đánh giá</span>
      </div>

      <span className={cx("separate")}></span>

      <div className={cx("rating")}>
        <p>{sold}</p>
        <span>&nbsp; đã bán</span>
      </div>
    </div>
  );
};

export default StarEvaluate;
