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
})
export class Cart {
  readonly cartService = inject(CartService);
  readonly ordersService = inject(OrdersService);

  productItemsInCart = signal(this.cartService.cart());

  readonly products = toSignal(
    toObservable(this.productItemsInCart).pipe(
      switchMap(items => {
        if (!items.length) return of([]);
        return forkJoin(
          items.map(item => {
            return this.ordersService.getProductById(item.productId).pipe(
              map(prod => ({
              ...prod,
              quantity: item.quantity
              })
            ))
          })
        );
      }),
    ),
    { initialValue: [] }
  );

  readonly countItems = this.cartService.countItems;
  readonly itemsPrice = computed(() => this.products().reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0));
  readonly packAndShippingPrice = computed(() => this.itemsPrice() > 0 && this.itemsPrice() < 100 ? 5 : 0);
  readonly totalPrice = computed(() => this.itemsPrice() + this.packAndShippingPrice());

  updateCartItem(prod: Product){
    const productItem = {productId: prod.id, quantity: prod.quantity ?? 0};
    const resp = this.cartService.setCartItem(productItem);
    this.productItemsInCart.set(resp());
  }

  deleteCartItem(id: string) {
    this.productItemsInCart.update((items) => items.filter(item => item.productId !== id));
    this.cartService.removeFromCart(id);

  }

  doCheckout() {
    console.log('Logout');
  }
}
