import { ResponseWithData } from "../types";
import configAxios from "./configAxios";

class ProductionApi {
    // search products
    getProductBySearch(textSearch: string) {
        const url = `/search?_q=${textSearch}`
        return configAxios.get<never, ResponseWithData>(url)
    }

    // get all brands
    getAllBrands() {
        const url = '/brands';
        return configAxios.get<never, ResponseWithData>(url);
    }

    // get all Categories product
    getCategories() {
        const url = `/categories`;
        return configAxios.get<never, ResponseWithData>(url)
    }

    // get products by category
    getProductsByCategory(category: string, page: string = '1', params?: any) {
        const url = `/${category}?page=${page}`;
        return configAxios.get<never, ResponseWithData>(url, {params})
    }

    // get product by category and slug
    getProductBycategoryAndSlug = (category: string, slug: string) => {
        const url = `/${category}/${slug}`;
        return configAxios.get<never, ResponseWithData>(url);
    }

}

const productionApi = new ProductionApi()

export default productionApi