export interface ResponseWithData {
    success: boolean;
    message: string;
    data: any
}

export interface Response {
    success: boolean;
    message: string;
}

export interface ProductsByCategoryResult {
    id: number;
    productName: string;
    price: number;
    productThumb: string;
    slug: string;
    brandName: string;
    brandImg: string;
    categoryName: string; 
    categorySlug: string;
}

interface DescriptionProduct {
    descId: number;
    titleDesc: string;
    contentDesc: string;
    imgDesc: string
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
    catalog: CatalogProduct[]
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

