import { Route } from '@angular/router';
import { Shell } from './shared/shell/shell';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductsList } from './pages/products/products-list/products-list';
import { CategoriesList } from './pages/categories/categories-list';
import { OrdersList } from './pages/orders/orders-list/orders-list';
import { UsersList } from './pages/users-list/users-list';
import { CategoryForm } from './pages/categories/category-form/category-form';
import { ProductForm } from './pages/products/product-form/product-form';
import { UserForm } from './pages/users-list/user-form/user-form';
import { OrderDetails } from './pages/orders/order-details/order-details';
import  { productResolver } from '@org/products';
import  { orderResolver } from '@org/orders';
import { AuthGuard, Login } from '@org/users';

export const appRoutes: Route[] = [
  {
    path: '',  component: Shell,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: 'products',
        component: ProductsList
      },
      {
        path: 'products/form',
        component: ProductForm
      },
      {
        path: 'products/form/:id',
          component: ProductForm,
          resolve: {
            product: productResolver
          }
      },
      // {
      //   path: 'products/form/:id',
      //   component: ProductForm
      // },
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
        path: 'orders/:id',
        component: OrderDetails,
        resolve: {
          order: orderResolver
        }
      },
      {
        path: 'users',
        component: UsersList
      },
      {
        path: 'users/form',
        component: UserForm
      },
      {
        path: 'users/form/:id',
        component: UserForm
      },
      {
        path: 'logout',
        component: Dashboard  //just for tests
      }
    ]
  },
  {
    path: 'login',
    component: Login
  },
];
