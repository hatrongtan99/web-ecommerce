import classNames from "classnames/bind";
import { FaCartPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import styles from "./priceDeltailProduct.module.scss";
const cx = classNames.bind(styles);

import PriceBox from "./priceBox/PriceBox";
import Button from "~components/custom/button/Button";
import ContactBox from "./contactBox/ContactBox";
import { ProductDetails } from "~types/product.type";
import { addProductToCart } from "~api/cart.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import useAuth from "~hook/useAuth";

const PriceDeltailProduct = ({ product }: { product: ProductDetails }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { auth, setRedirect } = useAuth();

    const axiosPrivate = useAxiosPrivate();

    const mutation = useMutation(
        (params: { product: string; quantity: number }) =>
            addProductToCart(axiosPrivate, params),
        {
            onSuccess: () => {
                return queryClient.invalidateQueries([
                    "cart-user",
                    auth?.user._id,
                ]);
            },
        }
    );

    // set redirect and push login page
    const fnHelper = () => {
        setRedirect({ pathname: router.pathname, query: router.query });
        router.push("/auth/login");
    };

    const handleAddCart = () => {
        if (auth == null || !auth.token) {
            fnHelper();
        } else {
            mutation.mutate({ product: product._id, quantity: 1 });
        }
    };

    const handleBuyImme = () => {
        if (auth == null || !auth.token) {
            fnHelper();
        } else {
            mutation.mutate({ product: product._id, quantity: 1 });
            router.push(`/checkout/${auth.user._id}`);
        }
    };

    return (
        <section>
            <PriceBox product={product} />

            {/* buton */}
            <div className={cx("button-wrapper")}>
                <Button
                    size="md"
                    variant="primary-border"
                    leftIcon={<FaCartPlus />}
                    onClick={handleAddCart}
                >
                    <p className={cx("button-title")}>Thêm Vào Giỏ</p>
                </Button>

                <Button size="md" onClick={handleBuyImme}>
                    <p className={cx("button-title")}>Mua Ngay</p>
                </Button>

                <Button
                    size="md"
                    variant="secondary"
                    onClick={() => alert("Tương tác")}
                >
                    <p className={cx("button-title")}>Cần Tư Vấn</p>
                </Button>
            </div>

            <ContactBox />
        </section>
    );
};

export default PriceDeltailProduct;
