import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { form, FormField, required } from '@angular/forms/signals';
import { CategoriesService, Category } from '@org/products';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-category-form',
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

  ],
  providers: [MessageService,],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryForm implements OnInit{
  private readonly location = inject(Location);
  private readonly categoriesService = inject(CategoriesService);
  private readonly messageService = inject(MessageService);
  private readonly route = inject(ActivatedRoute);

  categoryModel = signal<Category>({
    name: '',
    icon: ''
  })

  categoryForm = form(this.categoryModel, (fieldPath) => {
    required(fieldPath.name, {message: 'This field is mandatory'})
  });

  ngOnInit() {
    
  }

  goBack() {
    this.location.back();
  }

  submit() {
    // if(!this.categoryForm().value().name) return;
    this.categoriesService.saveCategory(this.categoryForm().value()).subscribe(
      {
        next: () => {
          this.showSuccess();
          this.categoryForm().setControlValue({name: '', icon: ''});
          timer(2000).toPromise().then(() => this.location.back());
        },
        error: () => this.showError()
      },

    )
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Category saved successufuly!'
    })
  }

    showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Category not saved'
    })
  }
}
