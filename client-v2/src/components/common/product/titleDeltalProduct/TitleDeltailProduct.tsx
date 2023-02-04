import classNames from "classnames/bind";

import styles from "./titleDetailProduct.module.scss";
import StarEvaluate from "~components/common/starEvaluate/StarEvaluate";
import { ProductDetails } from "~types/product.type";

const cx = classNames.bind(styles);

const TitleDeltailProduct = ({ product }: { product: ProductDetails }) => {
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("name-detail")}>{product.name_product}</h1>
      <StarEvaluate
        detail={{
          sold: product.sold,
          totalFeedback: product.totalFeedback,
          rating: product.rating,
        }}
      />
    </div>
  );
};

export default TitleDeltailProduct;
