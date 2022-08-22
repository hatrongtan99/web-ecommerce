import {memo} from 'react';
import classNames from "classnames/bind";
import {Field, FieldArray, FormikErrors, FormikTouched} from 'formik';

import Button from "~/components/custom/button";
import InputForm from "~/components/custom/inputForm";
import { ProductBycategoryAndSlugResult } from "~/types/index";

import styles from '../../updateProduct/updateProduct.module.scss';
import { CreateOrUpdateCatalogType } from '../CreateOrUpdateCatalog';

const cx = classNames.bind(styles);

interface CatalogProps<T extends CreateOrUpdateCatalogType> {
  product:  ProductBycategoryAndSlugResult;
  values: T;
}

const Category = <T extends CreateOrUpdateCatalogType>({
  product,
  values
}: CatalogProps<T>) => {
  return (
    <div className={cx('catalog-wrapper')}>
      <div className={cx('catalog')}>
        <h3 className={cx('catalog__title')}>THÔNG SỐ KỸ THUẬT</h3>
        
        <ul className={cx('catalog__list')}>
          {product.catalog.length > 0 && product.catalog.map((catalog) =>(
            <li className={cx('catalog__item')} key={catalog.catalogId}>
              <p>{catalog.titleCatalog}:</p>
              <span>{catalog.contentCatalog}</span>
            </li>
          ))}
        </ul>

      </div>

      <FieldArray
        name='product_catalog'
        render={({ insert, remove, push }) => (
          <div>
            {values.product_catalog.map((catalog, index) => (
              <div className='row' key={index}>
                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    leftlabel='Tiêu đề catalog:'
                    component={InputForm}
                    name={`product_catalog.${index}.title_catalog`}
                    className='form-control'
                  />
                </div>
                <div className={`col-5 ${cx('form-group', 'half')}`}>
                  <Field 
                    leftlabel='Nội dung catalog:'
                    component={InputForm}
                    name={`product_catalog.${index}.content_catalog`}
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
                    onClick={() => insert(index, { title_catalog: '', content_catalog: '' })}
                  >
                    +
                  </Button>
                </div>
                <div className={cx('separate')}/>
              </div>
            ))}
            <Button 
              variant="secondary-border" 
              onClick={() => push({ title_catalog: '', content_catalog: '' })} 
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

export default memo(Category)