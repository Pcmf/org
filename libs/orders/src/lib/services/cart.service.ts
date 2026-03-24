import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart';

export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',

})
export class CartService {
  readonly #cart = signal<CartItem[]>([]);
  readonly cart = this.#cart.asReadonly(); //to be accessed


  readonly totalItems = computed(() => this.#cart().length);  //different products in the cart


  constructor() {
    const localCart = localStorage.getItem(CART_KEY);
    if(localCart) {
      this.#cart.set(JSON.parse(localCart));
    }
    //to update the localstore every time the cart() changes
    effect(() => {
      localStorage.setItem(CART_KEY, JSON.stringify(this.#cart()));
    });
  }
  setCartItem(cartItem: CartItem) {
    const cartProdIds = computed(() => this.#cart().map(item => item.productId));
    if(cartProdIds().includes(cartItem.productId)){
      if(cartItem) {
      this.#cart.update((items) => items.map(item => item.productId === cartItem.productId ? cartItem : item));
      }
    } else {
      this.#cart.update((items) => [...items, cartItem]);
    }
    return this.cart;
  }

  addToCart(id: string, quantity: number) {
    this.#cart.update(cart => {
      //check if exists
      const exists = cart.some(item => item.productId === id);
      if(exists) {  //add quantity to the existent one
        return cart.map(item => item.productId === id ? {...item, quantity: item.quantity + quantity} : item);
      }
      //else add new product id with quantity
      return [...cart, {productId: id, quantity}];
    })
  }

  removeFromCart(id: string) {
    this.#cart.update(cart => cart.filter(item => item.productId !== id));
  }

  clearCart() {
    this.#cart.set([]);
  }

}
