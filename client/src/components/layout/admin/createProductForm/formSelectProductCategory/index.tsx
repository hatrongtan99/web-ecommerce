import { Field } from 'formik'
import { useState, useEffect, memo } from 'react'

import SelectForm from '~/components/custom/selectForm'
import productionApi from '~/api/productions';
import { CategoriesResult } from '~/types/index';

const FormSelectProductCategory = () => {
    console.log('run')
    const [categories, setCategories] = useState<CategoriesResult[]>([]);

    const fetchCategories = async () => {
        try {
            const categories = await productionApi.getCategories();
            setCategories(categories.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
  return (
    <Field 
        component={SelectForm} 
        name='productCategoryId' 
        className='form-select'
        leftlabel='Loại hàng:'
        aria-label=".form-select-sm"
    >
            <option value={''}>Chọn loại hàng</option>
        {categories.length > 0 && categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
        ))}
    </Field>
  )
}

export default memo(FormSelectProductCategory)