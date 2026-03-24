import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of, forkJoin, map} from 'rxjs';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { OrdersService } from '../../services/orders.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'lib-cart',
  imports: [CardModule, ButtonModule, CurrencyPipe, InputNumberModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cartService = inject(CartService);
  readonly ordersService = inject(OrdersService);
  quantity = 0;

  readonly productItemsInCart = signal(this.cartService.cartR());
  readonly prodQtys = computed(() => Object.fromEntries(this.productItemsInCart().map((el => [el.productId, el.quantity]))))
  readonly products = toSignal(
    toObservable(this.productItemsInCart).pipe(
      switchMap(items => {
        if (!items.length) return of([]);
        return forkJoin(
          items.map(item => {
            return this.ordersService.getProductById(item.productId).pipe(
              map(prod => {
                prod.quantity = item.quantity;
                return prod;
              })
            )
          })
        );
      }),
    ),
    { initialValue: [] }
  );

  backToShop() {
    console.log('Go back to shopping')
  }

  deleteCartItem(id: string) {
    console.log('Delete item, ', id);
  }
}
