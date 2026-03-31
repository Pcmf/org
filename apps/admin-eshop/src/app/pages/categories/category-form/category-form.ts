import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
import { map, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';



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
        CommonModule,
    ],
    providers: [MessageService],
    templateUrl: './category-form.html',
    styleUrl: './category-form.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryForm {
    private readonly location = inject(Location);
    private readonly categoriesService = inject(CategoriesService);
    private readonly messageService = inject(MessageService);
    private readonly route = inject(ActivatedRoute);

    categoryModel = signal<Category>({
        id: '',
        name: '',
        icon: '',
        _id: ''
    });

    categoryForm = form(this.categoryModel, (fieldPath) => {
        required(fieldPath.name, { message: 'This field is mandatory' });
    });

    categoryId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

    constructor() {
        effect(() => {
            const id = this.categoryId();
            if (id) {
                this.loadCategoryById(id);
            }
        });
    }

    loadCategoryById(id: string) {
        this.categoriesService.getCategoryById(id).subscribe((cat) => {
          if(!cat) return;
          this.categoryModel.set({
            _id: cat[0]._id,
            id: cat[0]._id!,
            name: cat[0].name,
            icon: cat[0].icon
          })
        });
    }

    goBack() {
        this.location.back();
    }

    submit() {
        if(this.categoryForm.id!().value()) {
          this.categoriesService.updateCategory(this.categoryForm().controlValue() as Category).subscribe({
            next: () => {
                this.showSuccess();
                this.categoryForm().setControlValue({_id: '', id: '', name: '', icon: '' });
                timer(2000)
                    .toPromise()
                    .then(() => this.location.back());
            },
            error: () => this.showError()
        });
        } else {
          this.categoriesService.saveCategory(this.categoryForm().value()).subscribe({
              next: () => {
                  this.showSuccess();
                  this.categoryForm().setControlValue({_id: '', id: '', name: '', icon: '' });
                  timer(2000)
                      .toPromise()
                      .then(() => this.location.back());
              },
              error: () => this.showError()
          });
        }
    }

    showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category saved successufuly!'
        });
    }

    showError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category not saved'
        });
    }
}
