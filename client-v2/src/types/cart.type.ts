export interface CartUser {
  _id: string;
  status: "idle" | "processed";
  user: string;
  created: string;
  products: []
}
