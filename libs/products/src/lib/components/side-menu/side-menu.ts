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

  readonly categories = toSignal(this.categoriesService.getCategories(), {initialValue: []});
  //filter seelected
  // readonly categories = computed(() =>
  //   this._categories().map(cat => ({
  //     ...cat,
  //     checked: cat.checked ?? false
  //   }))
  // );

  constructor() {
    effect(() => {
      const id = this.paramId();

      // if(!id) return;
      // console.log(id)
      // const cats = this.categories().map(category => ({
      //   ...category,
      //   checked: category._id === id
      // }));
      // console.log(cats)
      // this.selectedCategoriesOut.emit(cats);

      if(id) {
        const cats =  this.categories().map(c => {
          if(c._id === id) {
            c.checked = true;
          }
          return c;
        })
        this.selectedCategoriesOut.emit(cats);
      }
    })
  }

  updateSelectedCategories() {
    this.selectedCategoriesOut.emit([...this.categories()]);
  }
}
