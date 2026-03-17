import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-banner',
  imports: [ButtonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Banner {

}
