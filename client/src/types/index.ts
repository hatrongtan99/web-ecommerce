export interface ResponseWithData {
    success: boolean;
    message: string;
    data: any
}

export interface Response {
    success: boolean;
    message: string;
}

export interface ProductsByCategory {
    id: number;
    productName: string;
    price: number;
    productThumb: string;
    slug: string;
    brandName: string;
    brandImg: string;
    categoryName: string; 
    categorySlug: string;
    discount: number;
}

export interface ProductsByCategoryResult {
    products: ProductsByCategory[],
    metaData: {
        totalCount: number,
        restProducts: number
    }
}

interface DescriptionProduct {
    descId: number;
    titleDesc: string;
    contentDesc: string;
    imgDesc: string;
    titleImageDesc: string;
}

interface CatalogProduct {
    catalogId: number;
    titleCatalog: string;
    contentCatalog: string;
}

export interface ProductBycategoryAndSlugResult {
    id: number;
    productName: string;
    price: number;
    productThumb: string;
    slug: string;
    brandName: string;
    brandImg: string;
    categoryName: string;
    category: string;
    discount: number;
    quantity: number;
    sku: string;
    insurance: string;
    images: string[];
    description: DescriptionProduct[];
    catalog: CatalogProduct[];
    categoryId: number;
    brandId: number;
}

export interface ProductsInCartResult {
    cartItemId: number;
    orderId: number;
    productId: number;
    quantity: number;
    productName: string;
    price: number;
    productThumb: string;
    category: string;
    slug: string;
}

export interface BrandProductResult {
    idBrand: number;
    brandName: string;
    brandThumb: string;
}

export interface CategoriesResult {
    categoryId: number;
    categoryName: string;
    categorySlug: string;
}

