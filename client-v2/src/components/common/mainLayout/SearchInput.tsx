import { useState, memo, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames/bind";

import styles from "./mainLayout.module.scss";
import useDebounce from "~hook/useDebounce";
import { searchByText } from "~api/search.api";

const cx = classNames.bind(styles);

const SearchInput = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const value = useDebounce(textSearch);

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            try {
                const res: any = await searchByText({ _q: value });
                if (res.success) {
                    setData(res);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        })();
    }, [value]);

    return (
        <div className={cx("header__search")}>
            <div className={cx("form__search")}>
                <input
                    value={textSearch}
                    onChange={(e) => {
                        setTextSearch(e.target.value);
                        setIsLoading(true);
                    }}
                    placeholder="Tìm kiếm"
                />
                <button>
                    <BsSearch size="18" />
                </button>
            </div>
            {!!textSearch && (
                <div className={cx("pop-search")}>
                    {isLoading ? (
                        <div className="d-flex align-items-center justify-content-center">
                            loadding...
                        </div>
                    ) : (
                        <div>data is show </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SearchInput);
