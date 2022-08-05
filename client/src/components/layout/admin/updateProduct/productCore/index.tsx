import classNames from "classnames/bind";
import {Field, FormikErrors, FormikTouched} from 'formik';
import {ChangeEvent, memo, useState} from 'react'

import styles from '../../updateProduct/updateProduct.module.scss';
import { ProductBycategoryAndSlugResult } from "~/types/index";
import InputForm from "~/components/custom/inputForm";
import { FormikValuesType } from "../../updateProduct";
import FormSelectProductCategory from "../../createProductForm/formSelectProductCategory";
import FormSelectProductBrands from "../../createProductForm/FormSelectProductBrands";

const cx = classNames.bind(styles);

interface ProductCoreProps<T extends FormikValuesType> {
  product:  ProductBycategoryAndSlugResult;
  touched:  FormikTouched<T>;
  errors: FormikErrors<T>;
  values: T;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const ProductCore = <T extends FormikValuesType>({product, touched, errors, setFieldValue, values}: ProductCoreProps<T>) => {
  
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
      setFieldValue('images', e.target.files);
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
          {touched.products && errors.products && <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{errors as string}</div> }
      </div>

      <div className={cx('img-wrapper')}>
        {!imageThumb ? <img src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${product.productThumb}`} height='100' width='100'/>
          : <img src={imageThumb} height='100' width='100'/>
        }
      </div>

      <div className={cx('form-group')}>
          <div className='d-flex'>
            <label>Ảnh mô tả:</label>
            <input 
              multiple
              name='products.product_thumb'
              type='file' 
              className='form-control' 
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleMultipleImage({e, setFieldValue})}
            />
          </div>
          {/* {touched.images && errors.images && <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{errors as string}</div> } */}
      </div>

      {/* multipale images exits of product */}
      <div className={cx('img-wrapper')}>
        {pathImages.map((img, index) => <img src={img} key={index} height='100' width='100'/>)}
      </div>
      {/* new images */}

      {images.length > 0 ? (
        <div className={cx('img-wrapper')}>
          {images.map((img, index) => <img src={img} key={index} height='100' width='100'/>)}
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