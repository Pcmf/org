import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { UserStore } from '@org/users';

@Component({
  imports: [RouterModule, Header, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'eshop';
  readonly userStore = inject(UserStore);

  constructor() {
    const user = localStorage.getItem('user');
    if(user) {
      this.userStore.setUser(JSON.parse(user));
    }
  }

}
