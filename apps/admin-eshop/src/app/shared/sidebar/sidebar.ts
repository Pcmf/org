import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router'
import { LocalstorageService } from '@org/users';

@Component({
  selector: 'admin-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly localstorgeService = inject(LocalstorageService);

  logout() {
    this.localstorgeService.removeToken();
    window.location.reload();
  }
}
