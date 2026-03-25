import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { switchMap, of, forkJoin, map } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'lib-order-summary',
  imports: [CurrencyPipe, RouterModule, ButtonModule],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummary {
  readonly isCartPage = input(false);
  readonly ordersService = inject(OrdersService);
  readonly cartService = inject(CartService);


  readonly products = toSignal(
    toObservable(this.cartService.cart).pipe(
      switchMap(items => {
        if (!items.length) return of([]);
        return forkJoin(
          items.map(item => this.ordersService.getProductById(item.productId).pipe(
              map(prod => ({
              ...prod,
              quantity: item.quantity
              })
            ))
          )
        );
      }),
    ),
    { initialValue: [] }
  );

  readonly countItems = this.cartService.countItems;
  readonly itemsPrice = computed(() => this.products().reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0));
  readonly packAndShippingPrice = computed(() => this.itemsPrice() > 0 && this.itemsPrice() < 100 ? 5 : 0);
  readonly totalPrice = computed(() => this.itemsPrice() + this.packAndShippingPrice());
}
