import { CommonModule, Location} from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal, OnInit  } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormField, form, required } from '@angular/forms/signals';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UsersService } from '@org/users';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { map, timer } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import * as countriesLib from  'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { User } from '@org/shared';


@Component({
  selector: 'admin-user-form',
  imports: [
        CardModule,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        RouterModule,
        FormField,
        IftaLabelModule,
        ToastModule,
        CommonModule,
        ToggleSwitchModule,
        PasswordModule,
        SelectModule,
        FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class UserForm implements OnInit {
    private readonly location = inject(Location);
    private readonly usersService = inject(UsersService);
    private readonly messageService = inject(MessageService);
    private readonly route = inject(ActivatedRoute);

    countries: {id: string, name: string}[] = [];
    userModel = signal<User>({
        id: '',
        name: '',
        email: '',
        isAdmin: false,
        _id: '',
        phone: '',
        apartment: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        password: '',
    });

    userForm = form(this.userModel, (fieldPath) => {
        required(fieldPath.name, { message: 'This field is mandatory' });
        required(fieldPath.email, { message: 'This field is mandatory' });
        required(fieldPath.password!, {
          when: () => !this.isEditing(),
          message: 'This field is mandatory'
        });
    });

    userId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));
    isEditing = linkedSignal(() => !!this.userId());

    constructor() {
        effect(() => {
            const id = this.userId();
            if (id) {
                this.loadUserById(id);
            }
        });
    }

    ngOnInit() {
      this._getCountries();
    }

    loadUserById(id: string) {
        this.usersService.getById(id).subscribe((user) => {
          if(!user) return;
          this.userModel.set({
            id: user._id!,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id,
            phone: user.phone,
            apartment: user.apartment,
            street: user.street,
            zip: user.zip,
            city: user.city,
            country: user.country,
            password: '',
          })
        });
    }

    goBack() {
        this.location.back();
    }

    submit() {
        if(this.userForm.id!().value()) {
          this.usersService.update(this.userForm().controlValue() as User).subscribe({
            next: () => {
                this.showSuccess();
                this.clearForm();
                timer(2000)
                    .toPromise()
                    .then(() => this.location.back());
            },
            error: () => this.showError()
        });
        } else {
          this.usersService.save(this.userForm().value()).subscribe({
              next: () => {
                  this.showSuccess();
                  timer(2000)
                      .toPromise()
                      .then(() => this.location.back());
              },
              error: () => this.showError()
          });
        }
    }

    private _getCountries() {
      countriesLib.registerLocale(enLocale);
      this.countries = Object.entries(countriesLib.getNames('en', {select: 'official'}))
        .map(el => ({id: el[0], name: el[1]}));
    }
    private clearForm() {
      this.userForm().reset()
    }

    showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'user saved successufuly!'
        });
    }

    showError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'user not saved'
        });
    }
}
