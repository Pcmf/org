import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OrdersService, Order } from '@org/orders';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe, Location } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';

export interface Status {
  id: number; 
  label: string;
}



@Component({
  selector: 'admin-order-details',
  imports: [
    FieldsetModule,
    CardModule,
    ToastModule,
    DatePipe,
    CurrencyPipe,
    SelectModule,
    FormsModule,
    TableModule,
  ],
  providers: [MessageService],
  templateUrl: './order-details.html',
  styleUrl: './order-details.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetails {
  readonly route = inject(ActivatedRoute);
  readonly ordersService = inject(OrdersService);
  readonly messageService = inject(MessageService);
  readonly location = inject(Location);

  readonly status = [
    {id: '0', label: 'Pending'},
    {id: '1', label: 'Processed'},
    {id: '2', label: 'Shipped'},
    {id: '3', label: 'Delivered'},
    {id: '4', label: 'Failed'}
  ];

  order: Order = this.route.snapshot.data['order'];


  onStatusChange() {
    this.ordersService.update(this.order.id, this.order).subscribe(
      {
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status updated successufuly!'
          });
          setTimeout(() => {
            this.location.back();
          }, 2000)
        },
        error: () => this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: 'Status not updated!'
        })
      }
    )  
  }
}
