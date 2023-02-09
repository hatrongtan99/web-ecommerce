import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./productCheckout.module.scss";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";
import type { ProductInCart } from "~types/cart.type";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { addProductToCart } from "~api/cart.api";

const cx = classNames.bind(styles);

interface ProductCheckoutProps {
  productItem: ProductInCart;
}

const ProductCheckout = ({ productItem }: ProductCheckoutProps) => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { userId } = router.query!;

  const [quantity, setQuantity] = useState<number>(productItem.quantity);

  const mutation = useMutation(
    (params: { product: string; quantity: number }) =>
      addProductToCart(axiosPrivate, params),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["cart-user", userId]);
      },
    }
  );

  // handle delete product
  const hanldeDeleteProduct = (id: string) => {
    mutation.mutate({
      product: id,
      quantity: -productItem.quantity,
    });
  };

  // update quantity
  const hanldeChangeQuantity = (type: string, id: string) => {
    if (type == "desc") {
      if (quantity == 1) {
        ///
      } else {
        setQuantity((prev) => prev - 1);
        return mutation.mutate({ product: id, quantity: -1 });
      }
    } else {
      setQuantity((prev) => prev + 1);
      return mutation.mutate({ product: id, quantity: 1 });
    }
  };

  const img = productItem.product.images[0] ?? productItem.product.images;

  return (
    <div className={cx("product-checkout")}>
      <Link
        href={`/${productItem.product.categories[0].slug}/${productItem.product.slug}`}
      >
        <Image src={img} alt="image product" width={300} height={300} />
      </Link>
      <div className={cx("product-info")}>
        <Link
          href={`/${productItem.product.categories[0].slug}/${productItem.product.slug}`}
        >
          <h3>{productItem.product.name_product}</h3>
        </Link>

        <div className={cx("product-info__price")}>
          <strong>
            Giá sản phẩm: {productItem.perchasePrice.toLocaleString()} đ
          </strong>
        </div>

        <div className={cx("product-info__quantity")}>
          <p>Số lượng:</p>
          <button
            id="btnDesc"
            onClick={() =>
              hanldeChangeQuantity("desc", productItem.product._id)
            }
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => hanldeChangeQuantity("asc", productItem.product._id)}
          >
            +
          </button>
        </div>

        <div className={cx("product-info__total-price")}>
          <strong>Tổng giá: {productItem.totalPrice.toLocaleString()} đ</strong>
        </div>
      </div>

      <div
        className={cx("remove-icon")}
        id="remove-icon"
        data-bs-toggle="modal"
        data-bs-target="#delete-product-from-cart"
      >
        <TiDeleteOutline size="20" color="#337ab7" />
      </div>

      <BackdropModal
        body="Xác nhận xóa sản phẩm khỏi giỏ hàng"
        id="delete-product-from-cart"
        titleAgree="Đồng ý"
        handleAgree={() => hanldeDeleteProduct(productItem.product._id)}
      />
    </div>
  );
};

export default ProductCheckout;
