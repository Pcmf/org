import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, LoginUser } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Localstorage } from '../../services/localstorage';
import { Router } from '@angular/router';
import { UserStore } from '../../state/user-store';
import { UsersService } from '../../services/users.service';




@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'users-login',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit{
  readonly authServices = inject(Auth);
  readonly userService = inject(UsersService);
  readonly localstorageService = inject(Localstorage);
  readonly userStore = inject(UserStore);
  readonly router = inject(Router);
  isSubmiting = false;
  errorLogin = false;
  errorMessage = ''
  user!: LoginUser;


  fb = new FormBuilder();
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });
  }


  onSubmit(ev: Event) {
    ev.preventDefault();
    this.isSubmiting = true;
    const email = this.loginForm['email'].value;
    const password = this.loginForm['password'].value;
    this.authServices.login(email, password ).subscribe(
      {
        next: (user) => {
          this.user = user;
          this.errorLogin = false;
          console.log('Login page',this.user)
          this.localstorageService.setToken(user.token);
          this.userStore.setUser(user.user);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorLogin = true;
          this.errorMessage = error.error
        }
      }
    )
  }

  get loginForm() {
    return this.form.controls;
  }
}


