export interface Brands {
    brand_name: string;
    brand_thumb: string;
    isActive: boolean;
    created: string;
    slug: string;
    _id: string;
}

export interface CreateBrand {
    brand_name: string;
    brand_thumb: string;
    description?: string;
}
