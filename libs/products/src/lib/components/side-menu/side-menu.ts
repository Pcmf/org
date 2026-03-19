import { Component, inject, output, input, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CategoriesService } from '../../services/categories';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../../models/category';

@Component({
  selector: 'lib-side-menu',
  imports: [
    FormsModule,
    CheckboxModule,
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  readonly paramId = input<string | null | undefined>();
  readonly categoriesService = inject(CategoriesService);
  selectedCategoriesOut = output<Category[]>();

  readonly _categories = toSignal(this.categoriesService.getCategories(), {initialValue: []});
  //filter seelected
  readonly categories = computed(() =>
    this._categories().map(cat => ({
      ...cat,
      checked: cat._id === this.paramId()
    }))
  );

  constructor() {
    effect(() => {
      const id = this.paramId();
      const categories = this.categories();
      if(!id) return;
      const cats = categories.map(category => ({
        ...category,
        checked: category._id === id
      }));
      this.selectedCategoriesOut.emit(cats);
    })
  }

  updateSelectedCategories() {
    this.selectedCategoriesOut.emit([...this.categories()]);
  }
}
