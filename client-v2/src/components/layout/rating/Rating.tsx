import classNames from "classnames/bind";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

import RatingBox from "./RatingBox";
import styles from "./rating.module.scss";
import { getFeedback } from "~api/feedback.api";
const cx = classNames.bind(styles);

const Rating = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery(["list-feedbacks", id], () =>
    getFeedback(id)
  );

  const dFormat = (d: Date) => {
    return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString("en-GB");
  };

  return isSuccess ? (
    <>
      <RatingBox data={data?.meta} />

      <div className="mb-4">
        {data?.feedbacks?.map((feedback) => (
          <div className={cx("rating-comment")} key={feedback._id}>
            <div className={cx("name")}>
              <p>{feedback.user}</p>
              &nbsp;-&nbsp;
              <span>{dFormat(new Date(feedback.created))}</span>
            </div>

            <div className={cx("body")}>
              {new Array(5).fill(0).map((star, index) => (
                <AiFillStar
                  key={index}
                  size={20}
                  color={index + 1 <= feedback.rating ? "#f4c91f" : "#ddd"}
                />
              ))}
              <p>{feedback.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : null;
};

export default Rating;
