import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrdersService } from '@org/orders';
import { ProductsService } from '@org/products';
import { CardModule } from 'primeng/card';
import { UsersService } from '@org/users';

@Component({
  selector: 'admin-dashboard',
  imports: [
    CardModule,
    CurrencyPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly productsService = inject(ProductsService);
  readonly usersService = inject(UsersService);
  readonly ordersService = inject(OrdersService);

  productsCount = toSignal(this.productsService.getCount()!);
  totalSales = toSignal(this.ordersService.totalSales()!);
  ordersCount = toSignal(this.ordersService.ordersCount()!);
  usersCount = toSignal(this.usersService.usersCount());

}
