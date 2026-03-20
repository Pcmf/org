import { Component, inject, output, input, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { CategoriesService } from '../../services/categories';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-side-menu',
  imports: [
    FormsModule,
    CheckboxModule,
    ButtonModule,
    RouterLink
],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  readonly paramId = input<string | null | undefined>();
  readonly categoriesService = inject(CategoriesService);
  selectedCategoriesOut = output<string[]>();

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
      if(id)
      this.selectedCategoriesOut.emit([id]);
    })
  }

  updateSelectedCategories() {
  const selectedIds = this.categories()
    .filter(c => c.checked)
    .map(c => c._id);

    this.selectedCategoriesOut.emit(selectedIds);
  }

}
