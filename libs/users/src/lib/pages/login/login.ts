import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'users-login',
  imports: [InputGroupModule, InputGroupAddonModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

}
