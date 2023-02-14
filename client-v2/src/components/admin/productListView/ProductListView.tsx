import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";

import styles from "./productListView.module.scss";
import Product from "./Product";

const cx = classNames.bind(styles);

const ProductListView = () => {
  const router = useRouter();

  // const categoryValueRef = useRef<string>("may-khoan-bua-be-tong");
  // const [categoryValue, setCategoryValue] = useState<string>(
  //   categoryValueRef.current
  // );

  // useEffect(() => {
  //   categoryValueRef.current = categoryValue;
  // }, [categoryValue]);

  return (
    <div className="offset-2">
      <h1 className={cx("title")}>Danh sách sản phẩm</h1>
      <div className={cx("wrapper")}>
        <div className={cx("product-list")}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Product key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
