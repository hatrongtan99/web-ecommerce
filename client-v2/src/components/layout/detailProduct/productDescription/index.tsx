import classNames from "classnames/bind";
import Description from "./description/Description";

import Catalog from "./catalog/Catalog";
import styles from "./productDescription.module.scss";
import RatingBox from "./ratingBox/RatingBox";
import type { Catalog as CatalogType } from "~types/product.type";

const cx = classNames.bind(styles);

const ProductDescription = ({
  description,
  catalog,
}: {
  description: any;
  catalog: CatalogType[];
}) => {
  return (
    <div className={`row`}>
      {/* main description */}
      <div className="row">
        <div className={`col-8 ${cx("description")}`}>
          <Description />
        </div>
        <div
          className="col-4"
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <Catalog catalog={catalog} />
        </div>
      </div>

      <div className="col-8">
        {/* rating Box */}
        <RatingBox />
      </div>
    </div>
  );
};

export default ProductDescription;
