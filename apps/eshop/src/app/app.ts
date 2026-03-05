import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from "./pages/home-page/home-page";

@Component({
  imports: [RouterModule, HomePage],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'eshop';
}
