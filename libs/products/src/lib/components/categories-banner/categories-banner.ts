import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../services/categories';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-categories-banner',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-banner.html',
  styleUrl: './categories-banner.scss',
})
export class CategoriesBanner {
  readonly categoriesService = inject(CategoriesService);
  readonly categories = toSignal(
    this.categoriesService.getCategories(), { initialValue: []}
  );


}
