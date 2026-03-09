import { Route } from '@angular/router';
import { Shell } from './shared/shell/shell';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductsList } from './pages/products-list/products-list';
import { CategoriesList } from './pages/categories/categories-list';
import { OrdersList } from './pages/orders-list/orders-list';
import { UsersList } from './pages/users-list/users-list';
import { CategoryForm } from './pages/categories/category-form/category-form';

export const appRoutes: Route[] = [
  {
    path: '',  component: Shell,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        component: ProductsList
      },
      {
        path: 'categories',
        component: CategoriesList
      },
      {
        path: 'categories/form', component: CategoryForm
      },
      {
        path: 'categories/form/:id', component: CategoryForm
      },
      {
        path: 'orders',
        component: OrdersList
      },
            {
        path: 'users',
        component: UsersList
      },
      {
        path: 'logout',
        component: Dashboard  //just for tests
      }
    ]
  }
];
