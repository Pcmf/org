import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { OrderSummary } from '../order-summary/order-summary';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormField, form, required } from '@angular/forms/signals';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { User } from '@org/shared';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Order } from '@org/shared';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/order-item';
import { OrdersService } from '../../services/orders.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    readonly messageService = inject(MessageService);
    readonly router = inject(Router);

    countries: { id: string; name: string }[] = [];
    userModel = signal<User>({
        id: '',
        name: '',
        email: '',
        isAdmin: false,
        _id: '',
        phone: '',
        apartment: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        password: ''
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
    }

    submit() {
        if (this.userForm().invalid()) return;
        //procced
        const form = this.userForm().controlValue();
        const order: Order = {
            orderItems: this.getCartItems(),
            user: this._getUser(),
            shippingAddress1: form.street,
            shippingAddress2: form.apartment,
            city: form.city,
            country: form.country,
            phone: form.phone,
            zip: form.zip,
            status: '',
            totalPrice: 0,
            dateOrdered: new Date()
        };
        this.ordersService.insertOrder(order).subscribe({
        next: (newOrder) => {
          this.cartService.clearCart();
          this.messageService.add(
            {severity:'success', summary: 'Order placed',detail: 'Order placed successufuly with id: ' + newOrder.id}
          )
          setTimeout(() => {this.router.navigate(['/thanks'])}, 1000);
        },
        error: (err) => {
          this.messageService.add(
            {severity:'warn', summary: 'Error', detail: err.error}
          )
        }
      });
    }

    private getCartItems(): OrderItem[] {
        return this.cartService.cart().map((item) => ({
            // id: '',
            // _id:'',
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
