import classNames from "classnames/bind";
import styles from "./checkoutProductList.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getCartUser } from "~api/cart.api";

import ProductCheckout from "./productCheckout/ProductCheckout";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const CheckoutProductList = () => {
  const router = useRouter();
  const { userId } = router.query!;

  const axiosPrivate = useAxiosPrivate();

  const { data, isSuccess, isFetching } = useQuery(
    ["cart-user", userId],
    () => getCartUser(axiosPrivate),
    {
      refetchOnWindowFocus: false,
    }
  );

  const totalPrice = useMemo(() => {
    if (data?.data.success && data.data.cart) {
      return data.data.cart.products.reduce(
        (acc, product) => product.totalPrice + acc,
        0
      );
    } else {
      return 0;
    }
  }, [data]);

  return (
    <div className={cx("wrapper")}>
      {isSuccess ? (
        <div className={cx("product-list")}>
          {data.data?.cart.products.map((item) => (
            <ProductCheckout key={item.product._id} productItem={item} />
          ))}
        </div>
      ) : null}
      <div className={cx("total-pay")}>
        <p>Tổng tiền:</p>
        <strong>{totalPrice.toLocaleString()} đ</strong>
      </div>
    </div>
  );
};

export default CheckoutProductList;
