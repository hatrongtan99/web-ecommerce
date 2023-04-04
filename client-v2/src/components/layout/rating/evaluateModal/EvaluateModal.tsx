import classNames from "classnames/bind";
import { useState, MouseEvent, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import notify from "~utils/toastify";
import Button from "~components/custom/button/Button";
import { newFeedback } from "~api/feedback.api";
import styles from "../rating.module.scss";
import Spinner from "~components/common/spiner/Spiner";

const cx = classNames.bind(styles);

const evlString = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

interface EvaluateModalProps {
    title: string;
    id: string;
}

const EvaluateModal = ({ title, id }: EvaluateModalProps) => {
    const queryClient = useQueryClient();

    const [evlStar, setEvalStar] = useState(5);
    const [info, setInfo] = useState({
        content: "",
        user: "",
        phoneNumber: "",
        email: "",
    });

    const mutation = useMutation((data: any) => newFeedback(id, data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["list-feedbacks", id]);
        },
    });

    const handleOnChangeInputInfo = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleSetEvlStar = (e: MouseEvent<HTMLDivElement>) => {
        setEvalStar(+e.currentTarget.dataset.evl!);
    };

    const handleCloseModal = () => {
        document
            .querySelector("#modal-evalu")
            ?.classList.toggle(cx("togle-modal"));
    };

    const handleSubmitForm = async (e: Event) => {
        e.preventDefault();
        try {
            const res = await mutation.mutateAsync({
                ...info,
                rating: evlStar,
            });
            if (res.success) {
                notify("success", "Đánh giá thành công");
            }
        } catch (error: any) {
            notify("error", error?.response?.data?.message);
        }
    };

    return (
        <div className={cx("modal")} id="modal-evalu">
            {mutation.isLoading && <Spinner />}
            <form className={cx("modal__box")}>
                <div id={cx("icon-close")} onClick={handleCloseModal}>
                    <IoCloseCircleSharp size={26} />
                </div>
                <div className={cx("modal__box__header")}>
                    <h3>{title}</h3>
                </div>

                <div className={cx("modal__box__eval-icon")}>
                    <p>Đánh giá của bạn</p>
                    <div className={cx("modal__box__star")}>
                        {new Array(5).fill(0).map((star, index) => (
                            <div
                                className={cx("modal__box__star__item")}
                                data-evl={index + 1}
                                onClick={(e) => handleSetEvlStar(e)}
                                key={index}
                            >
                                <AiFillStar
                                    key={index}
                                    size={40}
                                    color={
                                        index + 1 <= evlStar
                                            ? "#f4c91f"
                                            : "#ddd"
                                    }
                                    style={{
                                        stroke:
                                            index + 1 <= evlStar
                                                ? "#f6ab27"
                                                : "#ddd",
                                        strokeWidth: "70",
                                    }}
                                />
                                <p>{evlString[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`row ${cx("modal__box__info")}`}>
                    <div className="col-12">
                        <textarea
                            className="form-control"
                            placeholder="Hãy chia sẽ thêm một chút cảm nhận của bạn"
                            name="content"
                            onChange={handleOnChangeInputInfo}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="form-control"
                            placeholder="Tên của bạn"
                            name="user"
                            required
                            onChange={handleOnChangeInputInfo}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="form-control"
                            placeholder="Số điện thoại của bạn"
                            name="phoneNumber"
                            required
                            onChange={handleOnChangeInputInfo}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="form-control"
                            placeholder="Email của bạn"
                            name="email"
                            required
                            onChange={handleOnChangeInputInfo}
                        />
                    </div>
                </div>
                <div className={cx("modal__box__footer")}>
                    <Button type="submit" onClick={handleSubmitForm}>
                        Gửi đánh giá
                    </Button>
                    <p>
                        Hệ thống sẽ xét duyệt đánh giá của bạn trước khi hiển
                        thị lên website.
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EvaluateModal;
