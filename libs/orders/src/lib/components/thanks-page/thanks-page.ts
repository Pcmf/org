import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'lib-thanks-page',
  imports: [
    ButtonModule,
    RouterModule,
    ToastModule,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './thanks-page.html',
  styleUrl: './thanks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThanksPage {
  readonly ordersService = inject(OrdersService);
  readonly cartService = inject(CartService);
  readonly messageService = inject(MessageService);

  constructor() {
    const cachedOrder = this.ordersService.getCachedOrderData();

    if (cachedOrder) {
      this.ordersService.insertOrder(cachedOrder).subscribe({
        next: () => {
          this.ordersService.cacheOrderData(null); // Clear cached data after saving
          this.cartService.clearCart(); // Clear the cart after successful order
          this.messageService.add({ severity: 'success', summary: 'Order Placed', detail: 'Your order has been successfully placed!' });
        },
        error: (err) => {
          console.error('Error saving order', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an issue processing your order. Please contact support.' });
        }
      });
    }
  }
}
