import { Component, inject, resource } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map } from 'rxjs';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyPipe, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Gallery } from '@org/ui';
import { CartService } from '@org/orders';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'lib-product-page',
  imports: [
    RatingModule,
    FormsModule,
    CurrencyPipe,
    InputNumberModule,
    ButtonModule,
    Gallery,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage {
  readonly location = inject(Location);
  readonly productsService = inject(ProductsService);
  readonly cartService = inject(CartService);
  readonly messageService = inject(MessageService);
  readonly route = inject(ActivatedRoute);

  quantity = 1;

  readonly productId = toSignal(this.route.paramMap.pipe(
    map((params) => params.get('id') ?? undefined)
  ));

  readonly product = resource<Product, string | undefined> ({
    params: () => this.productId() ?? undefined ,
    loader: (loaderParams) => firstValueFrom(this.productsService.getById(loaderParams.params))
  })

  addToCart() {
    const productId = this.productId();
    if (productId) {
      this.cartService.addToCart(productId, this.quantity);
      this.messageService.add({ severity: 'success', summary: 'Add to cart', detail: 'You add a product to cart!' });
    }
  }

  buyNow() {
    console.log('Buy now');
  }

}
