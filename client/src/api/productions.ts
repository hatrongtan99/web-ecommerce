import axiosClient from "./axiosClient";

class ProductionApi {
    // search products
    getProductBySearch(textSearch: string) {
        const url = `/search?_q=${textSearch}`
        return axiosClient.get(url)
    }
}

const productionApi = new ProductionApi()

export default productionApi