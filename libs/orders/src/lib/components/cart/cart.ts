import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of, forkJoin, map} from 'rxjs';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { OrdersService } from '../../services/orders.service';
import { CurrencyPipe, Location } from '@angular/common';
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
  readonly location = inject(Location)
  readonly cartService = inject(CartService);
  readonly ordersService = inject(OrdersService);

  readonly productItemsInCart = signal(this.cartService.cart());

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

  readonly countItems = computed(() => this.productItemsInCart().reduce((acc, prod) => acc + prod.quantity, 0));
  readonly itemsPrice = computed(() => this.products().reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0));
  readonly packAndShippingPrice = computed(() => this.itemsPrice() > 100 ? 0 : 5);
  readonly totalPrice = computed(() => this.itemsPrice() + this.packAndShippingPrice())

  updateCartItem(prod: Product){
    const productItem = {productId: prod.id, quantity: prod.quantity ?? 0};
    const resp = this.cartService.setCartItem(productItem);
    this.productItemsInCart.set(resp());
  }

  backToShop() {
    this.location.back();
  }

  deleteCartItem(id: string) {
    this.productItemsInCart.update((items) => items.filter(item => item.productId !== id));
    this.cartService.removeFromCart(id);

  }

  doCheckout() {
    console.log('Logout');
  }
}
