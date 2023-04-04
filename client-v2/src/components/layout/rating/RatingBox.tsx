import classNames from "classnames/bind";
import { AiTwotoneStar } from "react-icons/ai";

import styles from "./rating.module.scss";

const cx = classNames.bind(styles);

const RatingBox = ({ data }: { data: any }) => {
    const { detail, avg } = data;
    const totalSum = detail.reduce((acc: any, curr: any) => acc + curr.sum, 0);

    return (
        <div className={cx("rating-box")}>
            <div className={cx("rating-box__result")}>
                <p>
                    {avg?.toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    }) ?? 0}
                </p>
                <div className={cx("rating-box__star")}>
                    {new Array(5).fill(0).map((star, index) => (
                        <AiTwotoneStar
                            size={25}
                            color={index + 1 <= avg ? "#f4c91f" : "#ddd"}
                            key={index}
                        />
                    ))}
                </div>
                <span>{totalSum} đánh giá</span>
            </div>

            <div className={`col-12 row ${cx("rating-box__products")}`}>
                {[5, 2, 4, 1, 3].map((num) => {
                    const item = detail.find((i: any) => i.star === num);
                    let degre: string;
                    if (totalSum == 0 || !item) {
                        degre = "0 %";
                    } else {
                        degre =
                            (
                                ((item?.sum ?? 0) / totalSum) *
                                100
                            ).toLocaleString("en-US", {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1,
                            }) + "%";
                    }
                    return (
                        <div className="col-6" key={num}>
                            <div className={cx("rating-box__products__item")}>
                                <div className={cx("info-left")}>
                                    {item?.star ?? num}{" "}
                                    <AiTwotoneStar size={18} color="#f4c91f" />
                                </div>
                                <div className={cx("rating-process")}>
                                    <span style={{ width: degre }}></span>
                                </div>
                                <div className={cx("info-right")}>
                                    <p>{degre}</p>
                                    <span>{item?.sum ?? 0} đánh giá</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingBox;
