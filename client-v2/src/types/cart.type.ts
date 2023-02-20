export interface CartUser {
    _id: string;
    status: "idle" | "processed";
    user: string;
    created: string;
    products: ProductInCart[];
}

export interface ProductInCart {
    product: {
        _id: string;
        name_product: string;
        discount: number;
        price: number;
        images: string | string[];
        in_stock: number;
        slug: string;
        categories: { _id: string; name: string; slug: string }[];
    };
    quantity: number;
    perchasePrice: number;
    totalPrice: number;
    _id: string;
}
