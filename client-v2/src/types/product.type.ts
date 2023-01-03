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

export interface ProductDetails {
    success: boolean;
    product: {
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
        images: string[];
        in_stock: number;
        insurance: string;
        sku: string;
        catalog: Catalog[];
        deleted: boolean;
        created: string;
        slug: string;
    };
}
