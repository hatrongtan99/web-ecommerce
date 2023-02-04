import classNames from "classnames/bind";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProductByCategory } from "~api/product.api";
import ProductItem from "~components/common/product/productItem/ProductItem";
import SlideShow from "~components/common/product/slideShow/SlideShow";
import styles from "./productsRelatedSlide.module.scss";

const cx = classNames.bind(styles);

interface ProductsRelatedSlideProps {
  title: string;
  relate: any;
}

const ProductsRelatedSlide = ({ title, relate }: ProductsRelatedSlideProps) => {
  // fetch produt relate
  const { data, isSuccess } = useQuery(["product-relate", relate?.id], () =>
    getProductByCategory(relate?.category?.slug, {
      // exc: relate?.id,
    })
  );

  const [indexImg, setIndexImg] = useState<number>(0);
  const [isMove, setIsMove] = useState(false);

  const handleMoveSlide = (value: string) => {
    if (isMove) return;
    if (
      (indexImg == 0 && value == "prev") ||
      (indexImg == data?.data.products.length! - 1 && value == "next")
    )
      return;
    if (value == "next") {
      setIndexImg(indexImg + 1);
    } else if (value == "prev") {
      setIndexImg(indexImg - 1);
    }
    setIsMove(true);
  };

  const handleTransitionEnd = () => {
    setIsMove(false);
  };

  let style = {
    transform: `translateX(${indexImg * -25}%)`,
    transition: `all 0.25s ease 0s`,
  };

  return isSuccess ? (
    <div className={cx("product-related")}>
      <h3 className={cx("title")}>{title}</h3>
      <SlideShow
        handleMoveSlide={handleMoveSlide}
        handleTransitionEnd={handleTransitionEnd}
        style={style}
      >
        {data?.data?.products.map((product) => (
          <div className={`col-3`} key={product._id}>
            <ProductItem product={product} brandImg={true} />
          </div>
        ))}
      </SlideShow>
    </div>
  ) : null;
};

export default ProductsRelatedSlide;
