import classNames from "classnames/bind";
import styles from "./filter.module.scss";
import { useQuery } from "@tanstack/react-query";

import { getAllBrand } from "~api/brand.api";
import FilterInput from "~components/custom/filterInput/FilterInput";
import useSetActiveFilterLayout from "~hook/useSetActiveFilterLayout";
import usePushQueryUrl from "~hook/usePushQueryUrl";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const FilterByBrand = () => {
    const router = useRouter();
    const { data, isSuccess } = useQuery(["brands"], () => getAllBrand());
    const { active, handleClick } = useSetActiveFilterLayout("brand");
    usePushQueryUrl("brand", active, router, data);
    return (
        <section className={cx("filter-group")}>
            <h4>CHỌN THEO HÃNG SẢN XUẤT</h4>

            <div className={`row ${cx("input-group")}`}>
                {isSuccess &&
                    data.brands.map((item) => (
                        <div className="col-6 g-0" key={item._id}>
                            <FilterInput
                                active={active.includes(item._id)}
                                image={item.brand_thumb}
                                data-id={item._id}
                                handleClick={handleClick}
                            />
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default FilterByBrand;
