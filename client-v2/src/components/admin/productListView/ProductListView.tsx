import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { getAllProducts } from "~api/product.api";
import styles from "./productListView.module.scss";
import Product from "./Product";

const cx = classNames.bind(styles);

const ProductListView = () => {
  const router = useRouter();

  const { data, isSuccess } = useQuery(["list-product"], () =>
    getAllProducts(router.query)
  );

  return (
    <div className="container-fluid">
      <h1 className={cx("title")}>Danh sách sản phẩm</h1>
      {isSuccess && (
        <div className={`row ${cx("product-list")}`}>
          {data.products.map((product: any) => (
            <Product key={product._id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListView;
