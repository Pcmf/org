import { Component, computed, inject, resource, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '../product-item/product-item';
import { SideMenu } from '../side-menu/side-menu';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { Product } from '../../models/product';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
    selector: 'lib-products-list',
    imports: [ProductItem, SideMenu, ProgressSpinnerModule],
    templateUrl: './products-list.html',
    styleUrl: './products-list.scss'
})
export class ProductsList {
    readonly productsService = inject(ProductsService);
    readonly selectedCategories = signal<string[]>([]);
    readonly route = inject(ActivatedRoute);

    readonly paramId = toSignal(this.route.paramMap.pipe(
      map(params => params.get('id'))
    ));

    // constructor() {
    //   const id = this.paramId();
    //   if(!id) {
    //     this.selectedCategories().toLocaleString([]);
    //   }
    // }
    /**
     * Pure Signal aproach
     * executes always when the selectedCategories changes, 
     * cancel previous requests and handles the loading state, error state and caching
     */
    readonly products = resource<Product[], string[]>({
      params: () => this.selectedCategories(),
      loader: (loaderParams) =>
        firstValueFrom(this.productsService.getAll(loaderParams.params))
    });




    selectedCats(ids: string []) {
      this.selectedCategories.set(ids);
    }

}
