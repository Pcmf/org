import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router'
import { Localstorage } from 'libs/users/src/lib/services/localstorage';

@Component({
  selector: 'admin-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly localstorgeService = inject(Localstorage);

  logout() {
    this.localstorgeService.removeToken();
    window.location.reload();
  }
}
