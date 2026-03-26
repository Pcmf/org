import { Route } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProductPage, ProductsList } from '@org/products';
import { Cart, Checkout, ThanksPage } from '@org/orders';
import { AuthGuard, Login } from '@org/users';


export const appRoutes: Route[] = [
  {path: '', component: HomePage},
  { path: 'products', component: ProductsList},
  { path: 'products/category/:id', component: ProductsList},
  { path: 'products/:id', component: ProductPage},
  { path: 'cart', component: Cart},
  { path: 'checkout',canActivate: [AuthGuard], component: Checkout },
  { path: 'thanks', component: ThanksPage},
  { path: 'login', component: Login }
];
