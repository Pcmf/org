import { Product } from '@org/products';

export interface OrderItem {
  id: string;
  _id:string;
  product: Product;
  quantity: number;
}
