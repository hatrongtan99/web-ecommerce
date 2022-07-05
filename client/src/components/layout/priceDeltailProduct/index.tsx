import classNames from "classnames/bind";
import {FaCartPlus} from 'react-icons/fa';

import styles from './priceDeltailProduct.module.scss';
const cx = classNames.bind(styles);

import PriceBox from "./priceBox";
import Button from '~/components/custom/button';
import ContactBox from "./contactBox";
import LinkButton from "~/components/custom/linkButton";

const PriceDeltailProduct = () => {
  return (
    <>
        <PriceBox/>

        {/* buton */}
        <div className={cx('button-wrapper')}>
          <Button href='/' size="md" variant="primary-border" leftIcon={<FaCartPlus/>}>
              <p className={cx("button-title")}>Thêm Vào Giỏ</p>
          </Button >

          <LinkButton href='/' size='md' >
              <p className={cx("button-title")}>Mua Ngay</p>
          </LinkButton>

          <Button size="md" variant="secondary">
              <p className={cx("button-title")}>Cần Tư Vấn</p>
          </Button>
        </div>
        
        <ContactBox/>
    </>
  )
}

export default PriceDeltailProduct
