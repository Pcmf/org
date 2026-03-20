import { Component, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '../product-item/product-item';
import { SideMenu } from '../side-menu/side-menu';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
    selector: 'lib-products-list',
    imports: [ProductItem, SideMenu],
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

    readonly allProducts = toSignal(this.productsService.getAll(), {initialValue: []});

    //filter by categories
    readonly products = computed(() => {
      const selectedIds = new Set(this.selectedCategories());
      if(selectedIds.size === 0) return this.allProducts();
      return this.allProducts().filter(prod => selectedIds.has(prod.category._id)
      );
    });


    selectedCats(ids: string []) {
      this.selectedCategories.set(ids);
    }

}
