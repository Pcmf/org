import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { Product, ProductsService } from '@org/products'
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'admin-products-list',
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
    ConfirmDialogModule,
    DatePipe,
    CurrencyPipe
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  readonly confirmationService = inject(ConfirmationService);
  readonly productsService = inject(ProductsService);
  readonly messageService = inject(MessageService);
  readonly emptyProducts: Product[] = [];
  //search
  searchKey = signal('');
  //placeholder for delete ids
  deletedIds = signal<string[]>([]);
  //get from BE
  #products = toSignal(this.productsService.getAll(), {initialValue: []});
  //remove the deleted product frm list
  #products2 = computed(() => this.#products().filter( c => !this.deletedIds().includes(c._id!)))
  //filter by searchKey
  products = computed(() =>
    this.#products2()
      .filter(c => c.name.toLocaleLowerCase()
      .includes(this.searchKey().toLocaleLowerCase())
    )
  );



  confirm2(product: Product) {
    console.log(product);
  }
}
