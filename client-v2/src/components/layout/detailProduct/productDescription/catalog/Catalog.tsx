import classNames from "classnames/bind";
import { Catalog } from "~types/product.type";

import styles from "./catalog.module.scss";
const cx = classNames.bind(styles);

const Catalog = ({ catalog }: { catalog: Catalog[] }) => {
    return (
        <section className={cx("catalog")}>
            {" "}
            <h3 className={cx("catalog__title")}>THÔNG SỐ KỸ THUẬT</h3>
            <ul className={cx("catalog__list")}>
                {catalog.map((item, index) => (
                    <li className={cx("catalog__item")} key={index}>
                        <p>{item.title}:</p>
                        <span>{item.content}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Catalog;
