import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule} from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// interface Column {
//     field: string;
//     header: string;
// }
interface Product {
  name: string;
  code: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'admin-categories-list',
  imports: [TableModule, CardModule, ToolbarModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesList {
   orders = [
    { id: 1001, customer: 'John', total: 120 },
    { id: 1002, customer: 'Ana', total: 80 },
    { id: 1003, customer: 'Luis', total: 240 }
  ];
  products: Product[] = [
    {
      code: '1234',
      name: 'Product 1',
      category: 'cat1',
      quantity: 12
    },
    {
      code: '5678',
      name: 'Product 2',
      category: 'cat1',
      quantity: 5
    },
  ];
    cols!: [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

  selectProduct(product: Product) {
    console.log(product);
  }
}
