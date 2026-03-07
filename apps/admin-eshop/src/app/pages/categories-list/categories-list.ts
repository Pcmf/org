import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule} from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CategoriesService, Category } from '@org/products'
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'admin-categories-list',
  imports: [TableModule, CardModule, ToolbarModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesList {
  readonly categoriesService = inject(CategoriesService);
  readonly emptyCategories: Category[] = [];

  readonly categories = toSignal(this.categoriesService.getCategories(), {initialValue: []});

  selectCategory(cat: Category) {
    console.log(cat);
  }
}
