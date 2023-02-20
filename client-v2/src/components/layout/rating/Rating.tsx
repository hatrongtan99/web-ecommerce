import classNames from "classnames/bind";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

import RatingBox from "./RatingBox";
import styles from "./rating.module.scss";
import { getFeedback } from "~api/feedback.api";
import Button from "~components/custom/button/Button";
import EvaluateModal from "./evaluateModal/EvaluateModal";
import { dFormat } from "~utils/format";
const cx = classNames.bind(styles);

const Rating = ({ id, productName }: { id: string; productName: string }) => {
    const { data, isSuccess } = useQuery(["list-feedbacks", id], () =>
        getFeedback(id)
    );

    const hanldeOpenModal = () => {
        document
            .querySelector("#modal-evalu")
            ?.classList.toggle(cx("togle-modal"));
    };

    return isSuccess ? (
        <section>
            <div className={cx("rating__header")}>
                <h3>Đánh giá sản phẩm</h3>
                <Button size="sm" onClick={hanldeOpenModal}>
                    Đánh Giá Ngay
                </Button>
            </div>

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
                                    color={
                                        index + 1 <= feedback.rating
                                            ? "#f4c91f"
                                            : "#ddd"
                                    }
                                />
                            ))}
                            <p>{feedback.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <EvaluateModal title={`Đánh giá ${productName}`} id={id} />
        </section>
    ) : null;
};

export default Rating;
