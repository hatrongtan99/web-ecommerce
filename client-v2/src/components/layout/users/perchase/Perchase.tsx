import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "~components/custom/button/Button";

import type { OrderUser } from "~types/order.type";
import { dFormat } from "~utils/format";
import styles from "./perchase.module.scss";

const cx = classNames.bind(styles);

const Perchase = ({ data }: { data: OrderUser }) => {
  const router = useRouter();
  return (
    <div className={cx("container")}>
      {data.order.map((order) => {
        return (
          <div className={cx("item")} key={order._id}>
            <div className={cx("item__top")}>
              <p>
                Ngày đặt: <span>{dFormat(new Date(order.created))}</span>
              </p>
              <p className={cx("item__top__status")}>
                Trạng thái: <Link href={`puchase/${order._id}`}>Chờ xử lý</Link>
              </p>
            </div>

            <div className={cx("item__body")}>
              {order.cart.products.map((item) => {
                return (
                  <div className={cx("product")} key={item.product._id}>
                    <div className="d-flex">
                      <div className={cx("product__img")}>
                        <Link
                          href={`/${item.product.categories[0].slug}/${item.product.slug}`}
                        >
                          <Image
                            alt="product"
                            src={item.product.images[0]}
                            fill
                          />
                        </Link>
                      </div>
                      <div className={cx("product__title")}>
                        <h2>
                          <Link
                            href={`/${item.product.categories[0].slug}/${item.product.slug}`}
                          >
                            {item.product.name_product}
                          </Link>
                        </h2>
                        <p>
                          Số lượng: <span>{item.quantity}</span>
                        </p>
                      </div>
                    </div>

                    <div className={cx("product__price")}>
                      <strong>{item.perchasePrice.toLocaleString()} đ</strong>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={cx("item__footer")}>
              <p>
                Thành tiền: <span>{order.totalPrice.toLocaleString()} đ</span>
              </p>
              <Button
                style={{ padding: "6px 20px" }}
                onClick={() => router.push(`/users/puchase/${order._id}`)}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Perchase;
