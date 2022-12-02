import {ChangeEvent, memo} from 'react';
import classNames from "classnames/bind";
import {Field, FieldArray, FormikErrors, FormikTouched} from 'formik';

import styles from '../../updateProduct/updateProduct.module.scss';
import Button from "~/components/custom/button";
import InputForm from "~/components/custom/inputForm";
import { ProductBycategoryAndSlugResult } from "~/types/index";
import { CreateOrUpdateDescProductType } from '../createOrUpdateDesc';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface CreateOrUpdateDescProductProps<T> {
  product:  ProductBycategoryAndSlugResult;
  touched:  FormikTouched<T>;
  errors: FormikErrors<T>;
  values: T;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const Description = <T extends CreateOrUpdateDescProductType>({
  product,
  touched,
  errors,
  setFieldValue,
  values
}: CreateOrUpdateDescProductProps<T>) => {
  return (
    <div className={cx('desc-wrapper')}>
      <div className={cx('desc')}>
        {product.description.map((desc, index) => (
          <div key={desc.descId} className={cx('desc__item')}>
            {desc.contentDesc ? <h1>{desc.titleDesc}</h1> : null}
            {desc.contentDesc ? <p>{desc.contentDesc}</p> : null}
            {desc.imgDesc ? <div className={cx('img')}><Image layout='fill' objectFit='contain' alt='Ảnh mô tả.' src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${desc.imgDesc}`}/></div> : null}
            {desc.titleImageDesc ? <p>{desc.titleImageDesc}</p> : null}
          </div>
        ))}
      </div>
      <FieldArray
        name='desc_product'
        render={({ insert, remove, push }) => (
          <div>
            {values.desc_product.map((desc, index) => (
              <div className={`row ${cx('create-desc')}`} key={index}>
                <div className={`col-12 ${cx('form-group')}`}>
                  <Field 
                    leftlabel='Tiêu đề description:'
                    component={InputForm}
                    name={`desc_product.${index}.title`}
                    className='form-control'
                  />
                </div>
                <div className={`col-12 ${cx('form-group')}`}>
                  <Field 
                    placeholder='Nội dung description:'
                    as='textarea'
                    name={`desc_product.${index}.content`}
                    className='form-control'
                  />
                </div>

                <div className={`col-12 ${cx('form-group')}`}>
                  <Field 
                    leftlabel='Tiêu đề ảnh:'
                    component={InputForm}
                    name={`desc_product.${index}.title_image_desc`}
                    className='form-control'
                  />
                </div>

                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <div className='d-flex'>
                    <label>Ảnh mô tả:</label>
                    <input 
                      name={`desc_product.${index}.image_desc`}
                      type='file' 
                      className='form-control' 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files && setFieldValue(`desc_product.${index}.image_desc`, e.target.files[0])}
                    />
                  </div>
                </div>

                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    type='number'
                    leftlabel='Thứ tự:'
                    component={InputForm}
                    name={`desc_product.${index}.number_order`}
                    className='form-control'
                  />
                </div>

                <div className={`col-1`}>
                  <Button 
                    style={{minWidth: '50px'}}
                    type='button' 
                    size="sm" 
                    variant="primary-border" 
                    onClick={() => remove(index)}
                  >
                    -
                  </Button>
                </div>
                <div className={`col-1`}>
                  <Button 
                    style={{minWidth: '50px'}}
                    type='button' 
                    size="sm" 
                    variant="secondary-border" 
                    onClick={() => insert(index, {
                      title: '',
                      content: '',
                      image_desc: '',
                      title_image_desc: ''
                    })}
                  >
                    +
                  </Button>
                </div>
                <div className={cx('separate')}/>
              </div>
            ))}
            <Button 
              variant="secondary-border" 
              onClick={() => push({
                title: '',
                content: '',
                image_desc: '',
                title_image_desc: ''
              })} 
              type='button'
            >
              Thêm
            </Button>
          </div>
        )}
      />
    </div>
  )
}

export default memo(Description)