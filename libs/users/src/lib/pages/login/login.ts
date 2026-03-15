import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'users-login',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit{

  fb = new FormBuilder();
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });
  }


  onSubmit() {
    console.log(this.form.controls);
  }

  get loginForm() {
    return this.form.controls;
  }
}
