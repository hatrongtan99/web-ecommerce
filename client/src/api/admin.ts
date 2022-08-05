import { Response, ResponseWithData } from "../types";
import configAxios from "./configAxios";

class AdminApi {
    // upload single image
    uploadSingleImage(params: any) {
        const url = `/admin/upload-single`;
        return configAxios.post<never, ResponseWithData>(url, params)
    }

    // upload Multiple Images
    uploadMultipleImages(params: any) {
        const url = '/admin/upload-multiple';
        return configAxios.post<never, ResponseWithData>(url, params)
    }

    // create brand product
    createBrand(params: any) {
        const url = `/admin/brands`;
        return configAxios.post<never, Response>(url, {params})
    }

    // delete product by category and id
    deleteProduct(category: string, id: string) {
        const url = `/admin/${category}/${id}`;
        return configAxios.delete<never, Response>(url)
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
        return configAxios.patch<never, Response>(url, params);
    }
    
    // create product 
    createProduct(params: any) {
        const url = `/admin/products`;
        return configAxios.post<never, Response>(url, params);
    }
}
const adminApi = new AdminApi()
export default adminApi;