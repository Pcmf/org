import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '../product-item/product-item';

@Component({
    selector: 'lib-featured-products',
    imports: [ProductItem],
    templateUrl: './featured-products.html',
    styleUrl: './featured-products.scss'
})
export class FeaturedProducts {
    readonly productsService = inject(ProductsService);

    readonly products = toSignal(this.productsService.getFeatured(), { initialValue: [] });

    // private readonly categoryId$ = this.route.params.pipe(
    //   map(params => params['id'] ?? 'all'),
    //   distinctUntilChanged()
    // );

    // readonly categoryId = toSignal(this.categoryId$, { initialValue: 'all' });

    // readonly products = toSignal(
    //   this.categoryId$.pipe(
    //     tap(dt => console.log(dt)),
    //     switchMap(id =>
    //       this.productsService.getFeaturedByCategoryAndCount(id, 10)
    //     )
    //   ),
    //   { initialValue: [] }
    // );
}
