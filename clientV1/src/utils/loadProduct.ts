import productionApi from "~/api/productions";
import { saveProductByCategory, saveProductByCategoryAndSlug } from "~/redux/slice/productsSlice";
import { AppDispatch } from "~/redux/store";

const loadProductByCategory = async ( dispatch: AppDispatch, category: string, page: string, rest?: any ) => {
    try {
        const productsByCategory = await productionApi.getProductsByCategory(category, page, rest );
        dispatch(saveProductByCategory(productsByCategory.data))
    } catch (error) {
        console.log(error)
    }
}

const loadProductByCategoryAndSlug = async (dispatch: AppDispatch, category: string, slug: string) => {
    try {
        const product = await productionApi.getProductBycategoryAndSlug(category, slug);
        dispatch(saveProductByCategoryAndSlug(product.data));
    } catch (error) {
        console.log(error);
    }
}

export {loadProductByCategory, loadProductByCategoryAndSlug}