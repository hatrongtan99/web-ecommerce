import classNames from "classnames/bind";
import RatingBox from "./RatingBox";

import styles from "./rating.module.scss";
import { AiFillStar } from "react-icons/ai";
const cx = classNames.bind(styles);

const Rating = () => {
  return (
    <>
      <RatingBox />
      <div className="mb-4">
        <div className={cx("rating-comment")}>
          <div className={cx("name")}>
            <p>Castiel</p>
            &nbsp;-&nbsp;
            <span>13:38 19/09/2019</span>
          </div>

          <div className={cx("body")}>
            {new Array(5).fill(0).map((star, index) => (
              <AiFillStar
                key={index}
                size={20}
                color={index + 1 <= 5 ? "#f4c91f" : "#ddd"}
              />
            ))}
            <p>
              Hàng mình mới mua, đánh giá tổng quan ban đầu chất lượng và mẫu mã
              tốt, sẽ dùng và đánh giá cho anh em.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rating;
