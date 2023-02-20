import { memo } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";

import styles from "./productSpecial.module.scss";
import SlideSpecialProduct from "./slideSpecialProduct/SlideSpecialProduct";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "~api/product.api";

const cx = classNames.bind(styles);

interface ProductSpecialProps {
    title?: string;
}
const ProductSpecial = ({
    title = "Máy Khoan Nổi Bật",
}: ProductSpecialProps) => {
    const router = useRouter();

    const { category } = router.query!;

    const { data, isSuccess } = useQuery(["list-product-special"], () =>
        getProductByCategory(category as string, {
            page: 1,
            limit: 8,
        })
    );

    return isSuccess ? (
        <article className={cx("special-wrapper")}>
            <div className={cx("special__title")}>
                <h2>{title}</h2>
                <span></span>
            </div>
            <div className={cx("special__slice")}>
                <SlideSpecialProduct data={data.data.products} />
            </div>
        </article>
    ) : null;
};

export default memo(ProductSpecial);
