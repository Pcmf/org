import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-shell',
  imports: [Sidebar, RouterModule],
  templateUrl: './shell.html',
})
export class Shell {

}
