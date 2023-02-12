import classNames from "classnames/bind";
import { AiFillStar } from "react-icons/ai";

import styles from "./starEvaluate.module.scss";

const cx = classNames.bind(styles);

const StarEvaluate = ({ detail }: { detail: any }) => {
  const { rating, sold, totalFeedback } = detail;
  return (
    <div className={cx("star-wrapper")}>
      <div className={cx("rating")}>
        <p>
          {rating !== 0
            ? rating.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })
            : 0}
        </p>
      </div>
      <div className={cx("star")}>
        {new Array(5).fill(0).map((star, index) => (
          <AiFillStar
            key={index}
            size={20}
            color={index + 1 <= rating ? "#f4c91f" : "#ddd"}
            style={{ stroke: "#f6ab27", strokeWidth: "10" }}
          />
        ))}
      </div>

      <span className={cx("separate")}></span>

      <div className={cx("rating")}>
        <p>{totalFeedback}</p>
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