import { Field } from 'formik'
import { useState, useEffect, memo } from 'react'

import SelectForm from '~/components/custom/selectForm'
import productionApi from '~/api/productions';
import { BrandProductResult } from '~/types/index';

interface FormSelectProductBrandsProps {
    name: string
}

const FormSelectProductBrands = ({name}: FormSelectProductBrandsProps) => {
    const [brands, setBrands] = useState<BrandProductResult[]>([]);

    const fetchCategories = async () => {
        try {
            const categories = await productionApi.getAllBrands();
            setBrands(categories.data)
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
        name={name} 
        className='form-select'
        leftlabel='Hãng sản xuất:'
        aria-label=".form-select-sm"
        type='number'
    >
            <option value={''}  disabled hidden>Chọn hãng sản xuất:</option>
        {brands.length > 0 && brands.map(brand => (
            <option key={brand.idBrand} value={brand.idBrand}>{brand.brandName}</option>
        ))}
    </Field>
  )
}

export default memo(FormSelectProductBrands)