import Description from "./description/Description";

import Catalog from "./catalog/Catalog";
import type { Catalog as CatalogType } from "~types/product.type";

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
                <div className={`col-8 `}>
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
