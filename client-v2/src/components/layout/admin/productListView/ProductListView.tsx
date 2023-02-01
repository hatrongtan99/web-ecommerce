import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";

import styles from "./productListView.module.scss";
import ProductList from "./ProductListView";

const cx = classNames.bind(styles);

const ProductListView = () => {
  const router = useRouter();

  const categoryValueRef = useRef<string>("may-khoan-bua-be-tong");
  const [categoryValue, setCategoryValue] = useState<string>(
    categoryValueRef.current
  );

  useEffect(() => {
    categoryValueRef.current = categoryValue;
  }, [categoryValue]);

  return (
    <div className="offset-2">
      <h1 className={cx("title")}>Danh sách sản phẩm</h1>
      <div className={cx("wrapper")}>
        <div className="col-4 my-2">
          {/* <InputCategoriesFillter setCategoryValue={setCategoryValue}/> */}
        </div>
        {/* {dataProducts?.metaData && dataProducts?.products &&
                <>
                    <div className={cx('product-list')}>
                        <ProductList 
                            products={dataProducts.products}
                        />
                    </div>
                    <ButtonLoadExtraProducts metaData={dataProducts.metaData} categoryProps={categoryValue}/>
                </>
            } */}
      </div>
    </div>
  );
};

export default ProductListView;
