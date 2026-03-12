import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin-orders-list',
  imports: [],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersList {

}
