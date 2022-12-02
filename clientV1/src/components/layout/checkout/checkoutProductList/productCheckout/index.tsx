import classNames from "classnames/bind";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "~/redux/hooks";

import {TiDeleteOutline} from 'react-icons/ti';
import { ProductsInCartResult } from "~/types/index";

import styles from './productCheckout.module.scss';
import { changeQuantityProductThunk, deleteProductInCartThunk } from "~/redux/slice/checkoutSlice";
import Image from "next/image";

const cx = classNames.bind(styles);

interface ProductCheckoutProps {
    product: ProductsInCartResult
}

const ProductCheckout = ({product}: ProductCheckoutProps) => {
    const {productId } = product!;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState<number>(product.quantity)

    // delete product in cart 
    const handleDeleteProductIncart = async () => {
        dispatch(deleteProductInCartThunk({userId: router.query.userId as string, productId: productId.toString()}))
    }

    // update quantity
    const hanldeChangeQuantity = (type: string) => {
        if (type == 'desc') {
            if (quantity == 1) return
            setQuantity(quantity - 1)
            dispatch(changeQuantityProductThunk({userId: router.query.userId as string, productId: productId.toString(), quantity: quantity - 1}))
        } else {
            setQuantity(quantity + 1)
            dispatch(changeQuantityProductThunk({userId: router.query.userId as string, productId: productId.toString(), quantity: quantity + 1}))
        }
    }

  return (
    <div className={cx('product-checkout')}>
        <Link href='/'>
            <a className={cx('img-product-checkout')}>
                <Image layout='fill' objectFit='contain' src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${product.productThumb}`} alt=''/>
            </a>
        </Link>
        <div className={cx('product-info')}>
            <Link href={`/`}>
                <a>
                    <h3>{product.productName}</h3>
                </a>
            </Link>
            <div className={cx('product-info__price')}>
                <strong>Giá: {(product.price).toLocaleString()} đ</strong>
            </div>

            <div className={cx('product-info__quantity')}>
                <p>Số lượng:</p>
                <button onClick={() => hanldeChangeQuantity('desc')}>-</button>
                <span>{quantity}</span>
                <button onClick={() => hanldeChangeQuantity('asc')}>+</button>
            </div>
        </div>

        <div className={cx('remove-icon')} onClick={handleDeleteProductIncart}>
            <TiDeleteOutline size='20' color="#337ab7"/>
        </div>
    </div>
  )
}

export default ProductCheckout