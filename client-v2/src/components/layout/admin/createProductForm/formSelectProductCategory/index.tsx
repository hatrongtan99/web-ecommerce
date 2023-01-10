import { Field } from 'formik';
import { useState, useEffect, memo } from 'react';
import SelectForm from '~components/custom/selectForm/SelectForm';

interface FormSelectProductCategoryProps {
    name: string;
}

const FormSelectProductCategory = ({
    name,
}: FormSelectProductCategoryProps) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            // const categories = await productionApi.getCategories();
            // setCategories(categories.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Field
            component={SelectForm}
            name={name}
            className="form-select"
            leftlabel="Loại hàng:"
            aria-label=".form-select-sm"
        >
            <option value={''} disabled hidden>
                Chọn loại hàng
            </option>
            {categories.length > 0 &&
                categories.map((category) => (
                    <option
                    // key={category.categoryId}
                    // value={category.categoryId}
                    >
                        {/* {category.categoryName} */}
                    </option>
                ))}
        </Field>
    );
};

export default memo(FormSelectProductCategory);
