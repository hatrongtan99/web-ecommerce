import classNames from "classnames/bind";
import styles from "./filter.module.scss";

import FilterInput from "~components/custom/filterInput/FilterInput";
import useSetActiveFilterLayout from "~hook/useSetActiveFilterLayout";
import usepushQueryUrl from "~hook/usePushQueryUrl";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

interface FilterSpecialFieldProps {
    title: string;
    data: any;
    queryField: string;
}

const FilterSpecialField = ({
    title,
    data,
    queryField,
}: FilterSpecialFieldProps) => {
    const { active, handleClick } = useSetActiveFilterLayout(queryField);
    const router = useRouter();
    usepushQueryUrl(queryField, active, router);

    return (
        <section className={cx("filter-group")}>
            <h4>{title}</h4>

            <div className={`row ${cx("input-group")}`}>
                {data.map((item: any) => (
                    <div className="col-6 g-0" key={item._id || item.id}>
                        <FilterInput
                            active={active.includes(item.id.toString())}
                            data-id={item.id}
                            handleClick={handleClick}
                            title={item.title}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FilterSpecialField;
