import { Component } from '@angular/core';
import { Banner } from '@org/ui';
import { CategoriesBanner, FeaturedProducts } from '@org/products';

@Component({
  selector: 'app-home-page',
  imports: [
    Banner,
    CategoriesBanner,
    FeaturedProducts
],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
}
