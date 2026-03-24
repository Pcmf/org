import { Route } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProductPage, ProductsList } from '@org/products';
import { Cart } from '@org/orders';

export const appRoutes: Route[] = [
  {path: '', component: HomePage},
  { path: 'products', component: ProductsList},
  { path: 'products/category/:id', component: ProductsList},
  { path: 'products/:id', component: ProductPage},
  { path: 'cart', component: Cart}
];
