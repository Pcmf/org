import { Route } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProductsList } from '@org/products';

export const appRoutes: Route[] = [
  {path: '', component: HomePage},
  { path: 'products', component: ProductsList},
  { path: 'products/category/:id', component: ProductsList},
];
