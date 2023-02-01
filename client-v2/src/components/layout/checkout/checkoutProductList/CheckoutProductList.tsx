import classNames from "classnames/bind";
import styles from "./checkoutProductList.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";

import ProductCheckout from "./productCheckout/ProductCheckout";

import Spinner from "~components/common/spiner/Spiner";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { getCartUser } from "~api/cart.api";

const cx = classNames.bind(styles);

const CheckoutProductList = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const { userId } = router.query!;

  const {
    data: cartUser,
    isLoading,
    isRefetching,
  } = useQuery(
    ["cart-user", userId as string],
    () => getCartUser(axiosPrivate),
    { refetchOnWindowFocus: false }
  );

  const totalPrice = useMemo(() => {
    if (cartUser && cartUser.cart) {
      return cartUser.cart.products.reduce(
        (acc, product) => product.totalPrice + acc,
        0
      );
    } else {
      return 0;
    }
  }, [cartUser]);

  return (
    <div className={cx("wrapper")}>
      {isLoading || isRefetching ? (
        <Spinner />
      ) : (
        <div className={cx("product-list")}>
          {cartUser?.cart.products.map((item) => (
            <ProductCheckout key={item.product._id} productItem={item} />
          ))}
        </div>
      )}
      <div className={cx("total-pay")}>
        <p>Tổng tiền:</p>
        <strong>{totalPrice.toLocaleString()} đ</strong>
      </div>
    </div>
  );
};

export default CheckoutProductList;
