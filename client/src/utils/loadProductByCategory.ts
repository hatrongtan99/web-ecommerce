import productionApi from "~/api/productions";
import { saveProductByCategory } from "~/redux/slice/productsSlice";
import { AppDispatch } from "~/redux/store";

const loadProductByCategory = async ( dispatch: AppDispatch, category: string, page: string, rest?: any ) => {
    const productsByCategory = await productionApi.getProductsByCategory(category, page, rest );
    dispatch(saveProductByCategory(productsByCategory.data))
}

export default loadProductByCategory