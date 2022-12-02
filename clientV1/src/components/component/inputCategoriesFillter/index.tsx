import { useState, useEffect, memo, ChangeEvent } from "react"
import productionApi from "~/api/productions";
import { CategoriesResult } from "~/types/index";

interface InputCategoriesFillterProps {
    setCategoryValue: (category: string) => void
}

const InputCategoriesFillter = ({setCategoryValue}: InputCategoriesFillterProps) => {

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
    <select 
        className="form-select" 
        aria-label="Default select example" 
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryValue(e.currentTarget.value)}
    >
        {categories.length > 0 && categories.map(category => (
            <option key={category.categoryId} value={category.categorySlug}>{category.categoryName}</option>
        ))}
    </select>
  )
}

export default memo(InputCategoriesFillter)