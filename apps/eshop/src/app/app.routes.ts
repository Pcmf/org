import { Route } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

export const appRoutes: Route[] = [
  {path: '', component: HomePage},
  {path: 'list', loadComponent: () => import('./pages/product-list/product-list')
    .then(m => m.ProductList)
   }
];
