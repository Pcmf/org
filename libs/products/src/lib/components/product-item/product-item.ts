import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-product-item',
  imports: [
    ButtonModule,
    CurrencyPipe,
    RouterLink
],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly addToCart = output<string>();

  
}
