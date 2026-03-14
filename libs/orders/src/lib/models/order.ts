import { OrderItem } from "./order-item";
import { User } from '@org/products';

export interface Order {
  id: string;
  _id: string;
  orderItems: OrderItem[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  user: User;
  totalPrice: number;
  dateOrdered: Date;
}
