import classNames from "classnames/bind";
import {ErrorMessage, Field, FormikErrors, FormikTouched} from 'formik';
import {ChangeEvent, memo, useState} from 'react'

import styles from '../../updateProduct/updateProduct.module.scss';
import { ProductBycategoryAndSlugResult } from "~/types/index";
import InputForm from "~/components/custom/inputForm";
import FormSelectProductCategory from "../../createProductForm/formSelectProductCategory";
import FormSelectProductBrands from "../../createProductForm/FormSelectProductBrands";
import { UpdateProductType } from "../UpdateProductCore";
import Image from "next/image";

const cx = classNames.bind(styles);

interface ProductCoreProps<T extends UpdateProductType> {
  product:  ProductBycategoryAndSlugResult;
  touched:  FormikTouched<T>;
  errors: FormikErrors<T>;
  values: T;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const ProductCore = <T extends UpdateProductType>({product, touched, errors, setFieldValue, values}: ProductCoreProps<T>) => {
  
  const [imageThumb, setImageThumb] = useState<string>('');
  const pathImages = product.images.map(img => `${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${img}`);
  const [images, setImages] = useState<string[]>([]);
  
  // hanldle Single Image
  const hanldleSingleImage = ({e, setFieldValue}: {e: ChangeEvent<HTMLInputElement>, setFieldValue:(field: string, value: any, shouldValidate?: boolean | undefined) => void}) => {
    if (e.target.files) {
      setFieldValue('products.product_thumb', e.target.files[0])

      const url = URL.createObjectURL(e.target.files[0]);
      setImageThumb(url)
    }
  }

  const handleMultipleImage = ({e, setFieldValue}: {e: ChangeEvent<HTMLInputElement>, setFieldValue:(field: string, value: any, shouldValidate?: boolean | undefined) => void}) => {
    if (e.target.files) {
      setFieldValue('product_images', e.target.files);
      const urlImages = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const url = URL.createObjectURL(e.target.files[i]);
        urlImages.push(url);
      }
      setImages(urlImages)
    }
  }

  // handle error

  return (
    <div className={cx('product-core')}>
      <div className={cx('form-group')}>
        <Field 
          component={InputForm} 
          name='products.product_name'
          leftlabel='Tên sản phẩm:'
          className='form-control'
        />
      </div>

      <div className={cx('form-group')}>
        <Field 
          component={InputForm} 
          name='products.product_price'
          leftlabel='Giá sản phẩm:'
          className='form-control'
          type='number'
        />
      </div>

      {/* image */}
      <div className={cx('form-group')}>
          <div className='d-flex'>
              <label>Ảnh nền:</label>
              <input 
                name='products.product_thumb'
                type='file' 
                className='form-control' 
                onChange={(e: ChangeEvent<HTMLInputElement>) => hanldleSingleImage({e, setFieldValue})}
              />
          </div>
          <ErrorMessage name='products.product_thumb' render={(msg) => <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{msg}</div>}/>
      </div>

      <div className={cx('img-wrapper')}>
        {!imageThumb ? <div className={cx('img')}><Image layout='fill' objectFit='contain' alt='' src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${product.productThumb}`} /></div>
          : <div className={cx('img')}><Image layout='fill' objectFit="contain" alt='' src={imageThumb}/></div>
        }
      </div>

      <div className={cx('form-group')}>
          <div className='d-flex'>
            <label>Ảnh mô tả:</label>
            <input 
              multiple
              name='product_images'
              type='file' 
              className='form-control' 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleMultipleImage({e, setFieldValue})}
            />
          </div>
          <ErrorMessage name='product_images' render={(msg) => <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{msg}</div>}/>
      </div>

      {/* multipale images exits of product */}
      <div className={cx('img-wrapper')}>
        {pathImages.map((img, index) => <div key={index} className={cx('img')}><Image alt='' src={img} key={index} layout='fill' objectFit="contain" /></div>)}
      </div>

      {/* new images */}
      {images.length > 0 ? (
        <div className={cx('img-wrapper')}>
          {images.map((img, index) => <div key={index} className={cx('img')}><Image alt='' src={img} key={index} layout='fill' objectFit="contain" /></div>)}
        </div>
      ) : null}

      {/* category and brand */}
      <div className={cx('form-group')}>
        <FormSelectProductCategory name='products.product_category_id'/>
      </div>

      <div className={cx('form-group')}>
        <FormSelectProductBrands name='products.product_brand_id'/>
      </div>

      <div className={cx('form-group')}>
        <Field 
          component={InputForm} 
          name='product_discount.discount'
          leftlabel='Khuyến mãi:'
          className='form-control'
          type='number'
        />
      </div>

      <div className={cx('form-group')}>
        <Field 
          component={InputForm} 
          name='product_inventory.inventory'
          leftlabel='Số lượng có sẵn:'
          className='form-control'
          type='number'
        />
      </div>

      <div className={cx('form-group')}>
        <Field 
          component={InputForm} 
          name='products.sku'
          leftlabel='Mã hàng:'
          className='form-control'
        />
      </div>

      <div className={cx('form-group')}>
        <Field 
          component={InputForm} 
          name='products.insurance_time'
          leftlabel='Bảo hành:'
          className='form-control'
        />
      </div>
    </div>
  )
}

export default memo(ProductCore)