import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule} from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Category {
  id: string;
  name: string;
  icon: string;
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

  categories: Category[] = [
    {
      id: '1234',
      name: 'Category 1',
      icon: 'pi pi-user',
    },
    {
      id: '5678',
      name: 'Category 2',
      icon: 'pi pi-users',
    },
  ];
    cols!: [
            { field: 'id', header: 'id' },
            { field: 'name', header: 'Name' },
            { field: 'icon', header: 'icon' },
        ];

  selectCategory(cat: Category) {
    console.log(cat);
  }
}
