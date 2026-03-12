import { OrderItem } from "./order-item";

export interface Order {
  id: string;
  _id: string;
  orderItems: OrderItem[];
  shippinigAdress1: string;
  shippinigAdress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  user: string;
  totalPrice: number;
  dateOredered: Date;
}
