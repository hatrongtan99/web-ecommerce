import {memo} from 'react';
import classNames from "classnames/bind";
import {Field, FieldArray, FormikErrors, FormikTouched} from 'formik';

import Button from "~/components/custom/button";
import InputForm from "~/components/custom/inputForm";
import { ProductBycategoryAndSlugResult } from "~/types/index";
import { FormikValuesType } from "..";

import styles from '../../updateProduct/updateProduct.module.scss';

const cx = classNames.bind(styles);

interface CreateOrUpdateDescProductProps<T> {
  product:  ProductBycategoryAndSlugResult;
  touched:  FormikTouched<T>;
  errors: FormikErrors<T>;
  values: T;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const CreateOrUpdateDescProduct = <T extends FormikValuesType>({
  product,
  touched,
  errors,
  setFieldValue,
  values
}: CreateOrUpdateDescProductProps<T>) => {
  
  return (
    <div className={cx('catalog-form')}>
      <FieldArray
        name='desc_product'
        render={({ insert, remove, push }) => (
          <div>
            {values.desc_product.map((desc, index) => (
              <div className='row' key={index}>
                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    leftlabel='Tiêu đề description:'
                    component={InputForm}
                    name={`desc_product.${index}.title`}
                    className='form-control'
                  />
                </div>
                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    leftlabel='Nội dung description:'
                    component={InputForm}
                    name={`desc_product.${index}.content`}
                    className='form-control'
                  />
                </div>
                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    type='file'
                    leftlabel='Ảnh mô tả:'
                    component={InputForm}
                    name={`desc_product.${index}.image_desc`}
                    className='form-control'
                  />
                </div>

                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    leftlabel='Tiêu đề ảnh:'
                    component={InputForm}
                    name={`desc_product.${index}.title_image_desc`}
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

export default memo(CreateOrUpdateDescProduct)