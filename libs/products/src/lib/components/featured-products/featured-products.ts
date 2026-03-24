import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '../product-item/product-item';
import { CartService } from '@org/orders';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lib-featured-products',
    imports: [ProductItem, ToastModule],
    providers: [MessageService],
    templateUrl: './featured-products.html',
    styleUrl: './featured-products.scss'
})
export class FeaturedProducts {
    readonly productsService = inject(ProductsService);
    readonly cartService = inject(CartService);
    readonly messageService = inject(MessageService);

    readonly products = toSignal(this.productsService.getFeatured(), { initialValue: [] });

    addToCart(id: string) {
      this.cartService.addToCart(id, 1);
      this.messageService.add({ severity: 'success', summary: 'Add to cart', detail: 'You add a product to cart!' });

    }
}
