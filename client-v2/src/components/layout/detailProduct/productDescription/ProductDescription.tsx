import classNames from "classnames/bind";
import Description from "./description/Description";

import Catalog from "./catalog/Catalog";
import styles from "./productDescription.module.scss";
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
    <>
      {/* main description */}
      <div className="row">
        <div className={`col-8 ${cx("description")}`}>
          <Description desc={description} />
        </div>
        <div className="col-4">
          {/* catalog */}
          <Catalog catalog={catalog} />
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
