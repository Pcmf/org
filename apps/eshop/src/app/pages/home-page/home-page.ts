import { Component } from '@angular/core';
import { Banner } from '@org/ui';
import { ProductList } from "../product-list/product-list";
import { CategoriesBanner } from '@org/products';

@Component({
  selector: 'app-home-page',
  imports: [Banner, CategoriesBanner, ProductList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
}
