import { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { GrNext, GrPrevious } from "react-icons/gr";

import styles from "./slideShow.module.scss";
const cx = classNames.bind(styles);

interface SlideShowProps {
    children: ReactNode;
    handleMoveSlide: (value: string) => void;
    handleTransitionEnd: () => void;
    style: {};
}

const SlideShow = ({
    children,
    handleMoveSlide,
    handleTransitionEnd,
    style,
}: SlideShowProps) => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("slide-btn", "prev")}>
                <button onClick={() => handleMoveSlide("prev")}>
                    <GrPrevious size={20} />
                </button>
            </div>
            <div
                className={cx("slide-wrapper")}
                onTransitionEnd={handleTransitionEnd}
                style={style}
            >
                {children}
            </div>
            <div className={cx("slide-btn", "next")}>
                <button onClick={() => handleMoveSlide("next")}>
                    <GrNext size={20} />
                </button>
            </div>
        </div>
    );
};

export default SlideShow;
