import { ChangeDetectionStrategy, Component, inject, OnInit, signal, effect } from '@angular/core';
import { OrderSummary } from '../order-summary/order-summary';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormField, form, required } from '@angular/forms/signals';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { User, Order, OrderItem  } from '@org/shared';
import { ButtonModule } from 'primeng/button';
import * as countriesLib from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { UserStore } from '@org/users';
import { catchError, EMPTY, from, switchMap, tap } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { StripeService } from '../../services/stripe-service';

@Component({
    selector: 'lib-checkout',
    imports: [
      OrderSummary,
      FormField,
      IftaLabelModule,
      SelectModule,
      FormsModule,
      InputTextModule,
      ButtonModule,
      ToastModule,
      RouterModule
    ],
    providers: [
      MessageService
    ],
    templateUrl: './checkout.html',
    styleUrl: './checkout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout implements OnInit {
    readonly cartService = inject(CartService);
    readonly ordersService = inject(OrdersService);
    readonly userStore = inject(UserStore);
    readonly messageService = inject(MessageService);
    readonly router = inject(Router);
    readonly stripeService = inject(StripeService);

    countries: { id: string; name: string }[] = [];
    userModel = signal<User>({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
        apartment: '',
        street: '',
        zip: '',
        city: '',
        country: '',
    });

    userForm = form(this.userModel, (fieldPath) => {
        required(fieldPath.name, { message: 'This field is mandatory' });
        required(fieldPath.email, { message: 'This field is mandatory' });
        required(fieldPath.phone, { message: 'This field is mandatory' });
        required(fieldPath.apartment, { message: 'This field is mandatory' });
        required(fieldPath.street, { message: 'This field is mandatory' });
        required(fieldPath.zip, { message: 'This field is mandatory' });
        required(fieldPath.city, { message: 'This field is mandatory' });
        required(fieldPath.country, { message: 'This field is mandatory' });
    });


    ngOnInit() {
        this._getCountries();
        const user = this.userStore.user();
        if(user) {
          this.userForm.name().value.set(user.name);
          this.userForm.email().value.set(user.email);
          this.userForm.phone().value.set(user.phone);
          this.userForm.apartment().value.set(user.apartment);
          this.userForm.street().value.set(user.street);
          this.userForm.zip().value.set(user.zip);
          this.userForm.city().value.set(user.city);
          this.userForm.country().value.set(user.country);
        }
    }

    submit() {
      if(this.userForm().invalid()) return;
      const user = this._getUser();
      const orderItems = this.getCartItems();
      const order: Order = this.createOrder(user, orderItems);
      this.ordersService.createCheckoutSession(order.orderItems).pipe(
        tap((session: any) => {
          if (!session.url) {
            throw new Error('No checkout URL returned');
          }
          this.ordersService.cacheOrderData(order);
          window.location.href = session.url;
        }),
        catchError(err => {
          console.error('Checkout error:', err);
          return EMPTY;
        })
      ).subscribe();

    }


    private createOrder(user: User, orderItems: OrderItem[]) {
      const form = this.userForm().controlValue();
      return {
            orderItems,
            user,
            shippingAddress1: form.street,
            shippingAddress2: form.apartment,
            city: form.city,
            country: form.country,
            phone: form.phone,
            zip: form.zip,
            status: '',
            totalPrice: 0,
            dateOrdered: new Date()
        }
    }

    private getCartItems(): OrderItem[] {
        return this.cartService.cart().map((item) => ({
            productid: item.productId,
            quantity: item.quantity
        }));
    }

    private _getUser(): User {
        const form = this.userForm().controlValue();
        return {
            name: form.name,
            email: form.email,
            apartment: form.apartment,
            street: form.street,
            city: form.city,
            country: form.country,
            isAdmin: false,
            phone: form.phone,
            zip: form.zip
        };
    }

    private _getCountries() {
        countriesLib.registerLocale(enLocale);
        this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map((el) => ({ id: el[0], name: el[1] }));
    }
}
