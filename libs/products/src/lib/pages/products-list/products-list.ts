import { Component, inject, resource, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '../../components/product-item/product-item';
import { SideMenu } from '../../components/side-menu/side-menu';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { Product } from '../../models/product';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CartService } from '@org/orders';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lib-products-list',
    imports: [ProductItem, SideMenu, ProgressSpinnerModule, ToastModule],
    providers: [MessageService],
    templateUrl: './products-list.html',
    styleUrl: './products-list.scss'
})
export class ProductsList {
    readonly productsService = inject(ProductsService);
    readonly cartService = inject(CartService);
    readonly messageService = inject(MessageService);
    readonly selectedCategories = signal<string[]>([]);
    readonly route = inject(ActivatedRoute);

    readonly paramId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
    /**
     * Pure Signal aproach
     * executes always when the selectedCategories changes,
     * cancel previous requests and handles the loading state, error state and caching
     */
    readonly products = resource<Product[], string[]>({
        params: () => this.selectedCategories(),
        loader: (loaderParams) => firstValueFrom(this.productsService.getAll(loaderParams.params))
    });

    selectedCats(ids: string[]) {
        this.selectedCategories.set(ids);
    }

    addToCart(id: string) {
      this.cartService.addToCart(id, 1);
            this.messageService.add({ severity: 'success', summary: 'Add to cart', detail: 'You add a product to cart!' });

    }
}
