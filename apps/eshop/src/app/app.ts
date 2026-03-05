import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Banner } from '@org/ui';

@Component({
  imports: [RouterModule, Header, Footer, Banner],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'eshop';
}
