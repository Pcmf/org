import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-thanks-page',
  imports: [
    ButtonModule,
    RouterModule
  ],
  templateUrl: './thanks-page.html',
  styleUrl: './thanks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThanksPage {

}
