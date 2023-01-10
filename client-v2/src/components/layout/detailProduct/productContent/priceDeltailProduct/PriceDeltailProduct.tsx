import classNames from 'classnames/bind';
import { FaCartPlus } from 'react-icons/fa';

import styles from './priceDeltailProduct.module.scss';
const cx = classNames.bind(styles);

import PriceBox from './priceBox/PriceBox';
import Button from '~components/custom/button/Button';
import ContactBox from './contactBox/ContactBox';
import Link from 'next/link';

const PriceDeltailProduct = () => {
    return (
        <>
            <PriceBox />

            {/* buton */}
            <div className={cx('button-wrapper')}>
                <Button
                    href="/"
                    size="md"
                    variant="primary-border"
                    leftIcon={<FaCartPlus />}
                >
                    <p className={cx('button-title')}>Thêm Vào Giỏ</p>
                </Button>

                <Button href="/" size="md" as={Link}>
                    <p className={cx('button-title')}>Mua Ngay</p>
                </Button>

                <Button size="md" variant="secondary">
                    <p className={cx('button-title')}>Cần Tư Vấn</p>
                </Button>
            </div>

            <ContactBox />
        </>
    );
};

export default PriceDeltailProduct;
