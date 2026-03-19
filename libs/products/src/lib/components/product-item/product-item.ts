import { Component, input } from '@angular/core';
import { Product } from '../../models/product';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'lib-product-item',
  imports: [
    ButtonModule,
    CurrencyPipe
  ],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  readonly product = input.required<Product>();
}
