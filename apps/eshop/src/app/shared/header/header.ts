import { Component } from '@angular/core';
import { Search } from '@org/products';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  imports: [Search, Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
