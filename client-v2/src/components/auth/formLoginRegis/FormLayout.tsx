import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./formLayout.module.scss";

const cx = classNames.bind(styles);

const FormLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={cx("container")}>
            <div className={`row ${cx("wrapper")}`}>
                <div className="col-6">{children}</div>

                <div className={`col-6 ${cx("image")}`}>image</div>
            </div>
        </main>
    );
};

export default FormLayout;
