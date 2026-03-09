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
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  imports: [TableModule, CardModule, ToolbarModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, RouterModule],
  providers: [MessageService],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesList {
  readonly categoriesService = inject(CategoriesService);
  readonly messageService = inject(MessageService);
  readonly emptyCategories: Category[] = [];

  readonly categories = toSignal(this.categoriesService.getCategories(), {initialValue: []});

  selectCategory(cat: Category) {
    console.log(cat);
  }

  delete(category: Category) {
    console.log(category);
    this.categoriesService.delete(category).subscribe(
      {
        next: () => {
          this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Category deleted successufuly!'
              });
            console.log('Delete ', category);
          },
        error: () => this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Category not deleted'
                })
      }
    )

  }

}
