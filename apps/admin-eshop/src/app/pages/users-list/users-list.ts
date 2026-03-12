import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { UsersService, User } from '@org/products';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import * as countriesLib from  'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

@Component({
  selector: 'admin-users-list',
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
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersList {
  readonly confirmationService = inject(ConfirmationService);
  readonly usersService = inject(UsersService);
  readonly messageService = inject(MessageService);
  readonly emptyCategories: User[] = [];
  //search
  searchKey = signal('');
  //placeholder for delete ids
  deletedIds = signal<string[]>([]);
  //get from BE
  #users = toSignal(this.usersService.getAll(), {initialValue: []});
  //remove the deleted user frm list
  #users2 = computed(() => this.#users().filter( c => !this.deletedIds().includes(c._id!)))
  //filter by searchKey
  users = computed(() =>
    this.#users2()
      .filter(c => c.name.toLocaleLowerCase()
      .includes(this.searchKey().toLocaleLowerCase())
    )
  );

  constructor() {
    countriesLib.registerLocale(enLocale);
  }


  getCountry(countryKey: string): string {
      return countriesLib.getName(countryKey, 'en')!;
  }

  delete(id: string) {
    this.usersService.delete(id).subscribe(
      {
        next: () => {
          this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'User deleted successufuly!'
              });
          this.deletedIds.update((ids) => [...ids, id]);
          },
        error: () => this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'User not deleted'
                })
      }
    )
  }

  confirm2(event: string) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Do you want to delete this user?',
      header: 'Delete user',
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
          this.delete(event as string)
      },
      // reject: () => {   //thi is optional
      // }
    });
  }
}
