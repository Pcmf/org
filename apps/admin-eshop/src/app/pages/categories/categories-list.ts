import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'admin-categories-list',
  imports: [
    TableModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService ],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesList {
  readonly confirmationService = inject(ConfirmationService);
  readonly categoriesService = inject(CategoriesService);
  readonly messageService = inject(MessageService);
  readonly emptyCategories: Category[] = [];
  //search
  searchKey = signal('');
  //placeholder for delete ids
  deletedIds = signal<string[]>([]);
  //get from BE
  #categories = toSignal(this.categoriesService.getCategories(), {initialValue: []});
  //remove the deleted category frm list
  #categories2 = computed(() => this.#categories().filter( c => !this.deletedIds().includes(c._id!)))
  //filter by searchKey
  categories = computed(() =>
    this.#categories2()
      .filter(c => c.name.toLocaleLowerCase()
      .includes(this.searchKey().toLocaleLowerCase())
    )
  );


  delete(category: Category) {
    this.categoriesService.delete(category).subscribe(
      {
        next: () => {
          this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Category deleted successufuly!'
              });
          this.deletedIds.set([category._id!]);
          },
        error: () => this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Category not deleted'
                })
      }
    )
  }

  confirm2(event: Category) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Do you want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger'
      },

      accept: () => {
          this.delete(event as Category)
      },
      // reject: () => {
      // }
    });
  }

}
