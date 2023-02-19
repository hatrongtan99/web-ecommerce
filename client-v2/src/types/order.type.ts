export interface CreateOrderForm {
  sex: string;
  phoneNumber: string;
  address: string;
  note?: string;
}

export interface DetailOrderUser {
  _id: string;
  user: any;
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
  noteByAdmin: string;
  created: string;
}

export interface ChangeStatusOrder {
  status?:
    | "not processed"
    | "processed"
    | "shipping"
    | "delivered"
    | "cancelled";
  noteByAdmin?: string;
}
