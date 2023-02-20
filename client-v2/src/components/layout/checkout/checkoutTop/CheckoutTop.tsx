import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Button from "~components/custom/button/Button";

import styles from "./checkoutTop.module.scss";

const cx = classNames.bind(styles);

const CheckoutTop = () => {
    const router = useRouter();
    return (
        <div className={cx("checkout-top")}>
            <div className={cx("back")} onClick={() => router.back()}>
                <Button variant="text">
                    <HiOutlineChevronLeft />
                    <p>Mua thêm sản phẩm khác</p>
                </Button>
            </div>

            <p>Giỏ hàng của bạn</p>
        </div>
    );
};

export default CheckoutTop;
