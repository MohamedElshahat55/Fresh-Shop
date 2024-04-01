import { Product } from './product';
export interface ICartProduct extends Product {
  _id: string;
  totalCartPrice: number;
  Products: Product[];
}
