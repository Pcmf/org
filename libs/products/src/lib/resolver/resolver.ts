import { inject } from "@angular/core";
import { ResolveFn } from '@angular/router';
import { ProductsService } from "../services/products.service"
import { Product } from "../models/product";

export const productResolver: ResolveFn<Product> = (route) => {
  const productsService = inject(ProductsService);
  const id = route.paramMap.get('id');
  
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return productsService.getById(id!);
}
