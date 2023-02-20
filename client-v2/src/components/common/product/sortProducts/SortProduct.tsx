import { MouseEvent, useState } from "react";
import classNames from "classnames/bind";

import styles from "./sortProducts.module.scss";
import useInitStateFilter from "~hook/useInitStateFilter";
import FilterInput from "~components/custom/filterInput/FilterInput";
import usepushQueryUrl from "~hook/usePushQueryUrl";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const SortProduct = () => {
    const router = useRouter();
    const initialStateSortValue = useInitStateFilter("sort");

    const [sortValue, setSortValue] = useState<string[]>(initialStateSortValue);

    const handleCheckBox = (e: MouseEvent<HTMLElement>) => {
        if (sortValue.includes(e.currentTarget.dataset.sort as string)) {
            setSortValue([]);
        } else {
            setSortValue([e.currentTarget.dataset.sort as string]);
        }
    };

    usepushQueryUrl("sort", sortValue, router);

    return (
        <div className={cx("sort-wrapper")}>
            <div className="d-flex justify-content-center align-items-center">
                <h6>Sắp xếp: </h6>
                <div className={cx("sort-item")}>
                    <FilterInput
                        active={sortValue.includes("asc")}
                        title="Giá thấp đến cao"
                        data-sort="asc"
                        handleClick={handleCheckBox}
                    />
                </div>
                <div className={cx("sort-item")}>
                    <FilterInput
                        active={sortValue.includes("desc")}
                        title="Giá cao đến thấp"
                        data-sort="desc"
                        handleClick={handleCheckBox}
                    />
                </div>
            </div>
        </div>
    );
};

export default SortProduct;
