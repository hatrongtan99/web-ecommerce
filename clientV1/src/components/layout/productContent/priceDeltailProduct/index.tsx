import classNames from "classnames/bind";
import {FaCartPlus} from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { useRouter } from "next/router";

import styles from './priceDeltailProduct.module.scss';
const cx = classNames.bind(styles);

import PriceBox from "./priceBox";
import Button from '~/components/custom/button';
import ContactBox from "./contactBox";
import { addProductToCartThunk } from "~/redux/slice/checkoutSlice";

const PriceDeltailProduct = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  // const userId = window.localStorage.getItem(process.env.NEXT_PUBLIC_USER_SESSION_ID as string) as string

  const product = useAppSelector(state => state.products.dataByCategoryAndSlug);

  const handleAddProductToCart = () => {
    dispatch(addProductToCartThunk({userId: '6757353120781660100826405', productId: product.id, quantity: 1}))
  }

  const handleAddToCartAndBuyImmediately = () => {
    dispatch(addProductToCartThunk({userId: '6757353120781660100826405', productId: product.id, quantity: 1}));
    router.push(`/checkout/${'6757353120781660100826405'}`)
  }
  
  return (
    <>
      <PriceBox/>
      {/* buton */}
      <div className={cx('button-wrapper')}>
        <Button href='/' size="md" variant="primary-border" leftIcon={<FaCartPlus/>} style={{padding: '8px 4px'}}>
          <p className={cx("button-title")} onClick={handleAddProductToCart}>Thêm Vào Giỏ</p>
        </Button >

        <Button size='md'>
          <p className={cx("button-title")} onClick={handleAddToCartAndBuyImmediately}>Mua Ngay</p>
        </Button>

        <Button size="md" variant="secondary">
            <p className={cx("button-title")}>Cần Tư Vấn</p>
        </Button>
      </div>
      
      <ContactBox/>
    </>
  )
}

export default PriceDeltailProduct
