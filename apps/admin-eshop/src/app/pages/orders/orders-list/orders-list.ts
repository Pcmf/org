import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule} from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { OrdersService } from '@org/orders';
import { Order } from '@org/shared';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';

const ORDER_STATUS: Record<number, {label: string, color: 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined}> = {
  0: {
    label: 'Pending',
    color: 'secondary'
  },
  1: {
    label: 'Processed',
    color: 'warn'
  },
  2: {
    label: 'Shipped',
    color: 'warn'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  }
}

@Component({
  selector: 'admin-orders-list',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    TagModule,
    DatePipe,
  ],
  providers: [MessageService, ConfirmationService ],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersList {
  readonly confirmationService = inject(ConfirmationService);
    readonly ordersService = inject(OrdersService);
    readonly messageService = inject(MessageService);
    readonly emptyCategories: Order[] = [];

    //search
    searchKey = signal('');
    //placeholder for delete ids
    deletedIds = signal<string[]>([]);
    //get from BE
    #orders = toSignal(this.ordersService.getAll(), {initialValue: []});
    //remove the deleted order from the list
    #orders2 = computed(() => this.#orders().filter( c => !this.deletedIds().includes(c._id!)))
    //filter by searchKey
    orders = computed(() =>
      this.#orders2()
        .filter(c => c.user.name.toLocaleLowerCase()
        .includes(this.searchKey().toLocaleLowerCase())
      )
    );

    orderStatus = ORDER_STATUS;



}
