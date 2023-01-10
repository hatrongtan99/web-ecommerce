import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import classNames from 'classnames/bind';

import styles from './mainLayout.module.scss';

const cx = classNames.bind(styles);

const SearchInput = () => {
    const [textSearch, setTextSearch] = useState<string>('');

    const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value);
    };

    return (
        <form className={cx('form__search')}>
            <input
                value={textSearch}
                onChange={handleInputSearch}
                placeholder="Tìm kiếm"
            />
            <button>
                <BsSearch size="18" />
            </button>
        </form>
    );
};

export default SearchInput;
