import { Component, inject, output, input, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CategoriesService } from '../../services/categories';
import { toSignal } from '@angular/core/rxjs-interop';

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
  selectedCategoriesOut = output<(string | undefined)[]>();

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

  // updateSelectedCategories() {
  //   const selectedCats = this.categories()
  //   .filter(c => c.checked === true);
  //   if (selectedCats) {
  //     console.log(selectedCats);
  //     this.selectedCategoriesOut.emit([...selectedCats.map(e => e._id)])
  //   } else {
  //     this.selectedCategoriesOut.emit([''])
  //   }
    
  // }
}
