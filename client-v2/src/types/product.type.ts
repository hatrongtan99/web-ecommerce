export interface CreateProduct {
    name_product: string;
    brand: string;
    price: number;
    images: string[];
    insurance: string;
    sku: string;
    catalog: Catalog[];
    category: string;
}

export interface Catalog {
    title: string;
    content: string;
}

export interface ProductByCategory {
    created: string;
    image: string;
    isActive: boolean;
    name: string;
    products: {
        _id: string;
        name_product: string;
        discount: number;
        price: number;
        brand: {
            brand_name: string;
            brand_thumb: string;
            slug: string;
            _id: string;
        };
        images: string;
    }[];
    slug: string;
    _id: string;
}

export interface ProductDetails {
        specialField: any[];
        rating: number;
        _id: string;
        name_product: string;
        brand: {
            _id: string;
            brand_name: string;
            brand_thumb: string;
            isActive: boolean;
            created: string;
            slug: string;
        };
        discount: number;
        price: number;
        ratings: number;
        totalReviews: number;
        sold: number;
        images: string[];
        in_stock: number;
        insurance: string;
        sku: string;
        catalog: Catalog[];
        deleted: boolean;
        created: string;
        slug: string;
}