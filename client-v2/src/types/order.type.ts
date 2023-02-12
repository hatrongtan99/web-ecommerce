export interface CreateOrderForm {
  sex: string;
  phoneNumber: string;
  address: string;
  note?: string;
}

export interface OrderUser {
  order: {
    _id: string;
    user: string;
    cart: {
      _id: string;
      status: string;
      products: {
        quantity: number;
        perchasePrice: number;
        totalPrice: number;
        product: {
          _id: string;
          name_product: string;
          brand: {
            _id: string;
            brand_name: string;
            brand_thumb: string;
            slug: string;
          };
          categories: {
            name: string;
            slug: string;
          }[];
          images: string[];
          slug: string;
        };
      }[];
    };
    totalPrice: number;
    status:
      | "pending"
      | "not processed"
      | "processed"
      | "shipping"
      | "delivered"
      | "cancelled";
    sex: string;
    phoneNumber: string;
    address: string;
    note: string;
    created: string;
  }[];
}
