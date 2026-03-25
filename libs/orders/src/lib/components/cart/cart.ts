import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of, forkJoin, map} from 'rxjs';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { OrdersService } from '../../services/orders.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { RouterModule } from '@angular/router';
import { OrderSummary } from '../order-summary/order-summary';


@Component({
  selector: 'lib-cart',
  imports: [
    CardModule,
    ButtonModule,
    CurrencyPipe,
    InputNumberModule,
    FormsModule,
    RouterModule,
    OrderSummary
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {
  readonly cartService = inject(CartService);
  readonly ordersService = inject(OrdersService);

  readonly countItems = this.cartService.countItems;

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

  updateCartItem(prod: Product){
    const productItem = {productId: prod.id, quantity: prod.quantity ?? 0};
    this.cartService.setCartItem(productItem);
  }

  deleteCartItem(id: string) {
    this.cartService.removeFromCart(id);

  }

}
