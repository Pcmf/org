import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-order-summary',
  imports: [CurrencyPipe, RouterModule, ButtonModule],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummary {
  readonly itemsPrice = input.required<number>();
  readonly packAndShippingPrice = input.required<number>();
  readonly totalPrice = input.required<number>();

}
