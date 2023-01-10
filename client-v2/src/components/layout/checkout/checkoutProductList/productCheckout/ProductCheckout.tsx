import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { TiDeleteOutline } from 'react-icons/ti';

import styles from './productCheckout.module.scss';

const cx = classNames.bind(styles);

interface ProductCheckoutProps {}

const ProductCheckout = ({}: ProductCheckoutProps) => {
    const router = useRouter();

    const [quantity, setQuantity] = useState<number>(1);

    // delete product in cart

    // update quantity
    const hanldeChangeQuantity = (type: string) => {
        if (type == 'desc') {
            if (quantity == 1) return;
            setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className={cx('product-checkout')}>
            <Link href="/" legacyBehavior>
                <a>
                    <img
                        src="https://maydochuyendung.com/img/uploads/cache_image/100x-may-khoan-van-vit-dung-pin-bosch-gsb-180-li-500.jpg"
                        alt=""
                    />
                </a>
            </Link>
            <div className={cx('product-info')}>
                <Link href="/" legacyBehavior>
                    <a>
                        <h3>Máy khoan vặn vít dùng Pin Bosch GSB 180-LI</h3>
                    </a>
                </Link>
                <div className={cx('product-info__price')}>
                    <strong>Giá: {(3270000).toLocaleString()} đ</strong>
                </div>

                <div className={cx('product-info__quantity')}>
                    <p>Số lượng:</p>
                    <button onClick={() => hanldeChangeQuantity('desc')}>
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => hanldeChangeQuantity('asc')}>
                        +
                    </button>
                </div>
            </div>

            <div className={cx('remove-icon')}>
                <TiDeleteOutline size="20" color="#337ab7" />
            </div>
        </div>
    );
};

export default ProductCheckout;
