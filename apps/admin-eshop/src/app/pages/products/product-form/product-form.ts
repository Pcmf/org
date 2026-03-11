import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CategoriesService, Product, ProductsService } from '@org/products';
import { toSignal } from '@angular/core/rxjs-interop';
import { EditorModule } from 'primeng/editor';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs';

@Component({
    selector: 'admin-product-form',
    imports: [
        CardModule,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        RouterModule,
        IftaLabelModule,
        ToastModule,
        CommonModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputGroupModule,
        FloatLabelModule,
        ToggleSwitchModule,
        SelectModule,
        TextareaModule,
        EditorModule
    ],
    providers: [MessageService],
    templateUrl: './product-form.html',
    styleUrl: './product-form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductForm implements OnInit {
    readonly location = inject(Location);
    private formBuilder = inject(FormBuilder);
    readonly categoriesService = inject(CategoriesService);
    readonly productService = inject(ProductsService);
    readonly messageService = inject(MessageService);
    readonly route = inject(ActivatedRoute);

    editMode = false;
    form!: FormGroup;
    image!: string | ArrayBuffer;

    //load categories
    categories = toSignal(this.categoriesService.getCategories(), { initialValue: [] });
    //Check if has id on url
    productId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))));

    constructor() {
      effect(() => {
        const id = this.productId();
        if(id) {
          this.getProductById(id);
        }
      })
    }

    ngOnInit() {
        this._initForm();
    }

    submit() {
        if(this.form.invalid) return;
        const productFormData = new FormData();
        //fill the formData
        Object.keys(this.productForm).map(key => {
          productFormData.append(key, this.productForm[key].value)
        })
        //New or update
        if(!this.productForm['id'].value) {
          this._addProduct(productFormData);
        } else {
          this._updateProduct(productFormData);
        }
    }

    onImageUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (!input.files?.length) return;
      const file = input.files[0];
      this.image = URL.createObjectURL(file);
      this.form.patchValue({image: file});
      this.form.get('image')?.updateValueAndValidity();
    }

    private getProductById(id: string) {
      this.productService.getById(id).subscribe({
        next: (product: Product) => this.loadForm(product),
        error: () => console.log('Erro on loading product')
      })
    }

    private _initForm() {
      this.form = this.formBuilder.group({
          id: [''],
          name: ['', Validators.required],
          brand: ['', Validators.required],
          price: ['', Validators.required],
          category: ['', Validators.required],
          countInStock: ['', Validators.required],
          description: ['', Validators.required],
          richDescription: [''],
          image: ['', Validators.required],
          isFeatured: [false]
      });
    }

    private loadForm(product: Product) {
      Object.keys(product).map((key) => this.productForm[key]?.patchValue((product as any)[key]));
      //Replace by the above
      // this.productForm['id'].setValue(product.id);
      // this.productForm['name'].setValue(product.name);
      // this.productForm['brand'].setValue(product.brand);
      // this.productForm['price'].setValue(product.price);
      // this.productForm['countInStock'].setValue(product.countInStock);
      // this.productForm['brand'].setValue(product.brand);
      this.productForm['category'].setValue(product.category._id);
      // this.productForm['isFeatured'].setValue(product.isFeatured);
      // this.productForm['description'].setValue(product.description);
      // this.productForm['richDescription'].setValue(product.richDescription);
      // this.productForm['image'].setValue(product.image);
      this.image = product.image;
    }

    private _addProduct(productData: FormData) {
      this.productService.create(productData).subscribe({
        next: () => {
            this.showSuccess();
            timer(2000)
                .toPromise()
                .then(() => this.location.back());
        },
        error: () => this.showError()
      })
    }

    private _updateProduct(productData: FormData) {
      this.productService.update(this.productForm['id'].value, productData).subscribe({
        next: () => {
            this.showSuccess();
            timer(2000)
                .toPromise()
                .then(() => this.location.back());
        },
        error: () => this.showError()
      })
    }

    get productForm() {
        return this.form.controls;
    }

    goBack() {
        this.location.back();
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
