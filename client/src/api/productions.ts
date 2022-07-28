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

    // create brand product
    createBrand(params: any) {
        const url = `/admin/brands`;
        return configAxios.post<never, Response>(url, {params})
    }

    // get products by category
    getProductsByCategory(category: string, page: string, params?: any) {
        const url = `/${category}?page=${page}`;
        return configAxios.get<never, ResponseWithData>(url, {params})
    }

    // get product by category and slug
    getProductBycategoryAndSlug = (category: string, slug: string) => {
        const url = `/${category}/${slug}`;
        return configAxios.get<never, ResponseWithData>(url);
    }

    // delete product by category and id
    deleteProduct(category: string, id: string) {
        const url = `/admin/${category}/${id}`;
        return configAxios.delete<never, Response>(url)
    }

    // create product 
    createProduct(params: any) {
        const url = `/admin/products`;
        return configAxios.post<never, Response>(url, {params});
    }

    // create product description
    createProductDesc(idProduct: string, params: any) {
        const url = `/admin/products/${idProduct}/descriptions`;
        return configAxios.post<never, Response>(url, {params});
    }

    // create product catalog
    createCatalog(idProduct: string, params: any) {
        const url = `/admin/products/${idProduct}/catalog`;
        return configAxios.post<never, Response>(url, {params});
    }

    // update product
    updateProduct(idProduct: string, params: any) {
        const url = `admin/products/${idProduct}/update`;
        return configAxios.patch<never, Response>(url, {params});
    }
}

const productionApi = new ProductionApi()

export default productionApi