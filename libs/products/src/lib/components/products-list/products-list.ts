import { Component, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '../product-item/product-item';
import { SideMenu } from '../side-menu/side-menu';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Category } from '../../models/category';

@Component({
    selector: 'lib-products-list',
    imports: [ProductItem, SideMenu],
    templateUrl: './products-list.html',
    styleUrl: './products-list.scss'
})
export class ProductsList {
    readonly productsService = inject(ProductsService);
    readonly selectedCategories = signal<Category[]>([]);
    readonly route = inject(ActivatedRoute);

    readonly paramId = toSignal(this.route.paramMap.pipe(
      map(params => params.get('id'))
    ));

    readonly _products = toSignal(this.productsService.getAll(), {initialValue: []});
    //filter by categories
    readonly products = computed(() => {
      const products = this._products();
      const anySelected = this.selectedCategories().filter(el => el?.checked);
      if(anySelected.length > 0) {
        return products.filter(prod => anySelected?.find(cat => cat._id ===prod.category._id));
      }
      return products;
    });


}
