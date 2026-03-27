import { Component, inject } from '@angular/core';
import { Search } from '@org/products';
import { Nav } from '../nav/nav';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartService } from '@org/orders';
import { RouterLink } from "@angular/router";
import { UserStore } from '@org/users';

@Component({
  selector: 'app-header',
  imports: [Search, Nav, OverlayBadgeModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly cartService = inject(CartService);
  readonly totalItems = this.cartService.totalItems;
  readonly userStore = inject(UserStore);

  logout() {
    this.userStore.logOff();
  }
}
