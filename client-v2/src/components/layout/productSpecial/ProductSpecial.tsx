import { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './productSpecial.module.scss';
import SlideSpecialProduct from './slideSpecialProduct/SlideSpecialProduct';

const cx = classNames.bind(styles);

interface ProductSpecialProps {
    title?: string;
}
const ProductSpecial = ({
    title = 'Máy Khoan Nổi Bật',
}: ProductSpecialProps) => {
    return (
        <div className={cx('special-wrapper')}>
            <div className={cx('special__title')}>
                <h2>{title}</h2>
                <span></span>
            </div>
            <div className={cx('special__slice')}>
                <SlideSpecialProduct data />
            </div>
        </div>
    );
};

export default memo(ProductSpecial);
