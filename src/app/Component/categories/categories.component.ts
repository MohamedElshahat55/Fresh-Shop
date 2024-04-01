import { Component } from '@angular/core';
import { ICategory } from '../../Interface/category';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  //Variables
  categories: ICategory[] = [];

  //CTOR
  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    //Methods
    this._ProductsService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }
}
