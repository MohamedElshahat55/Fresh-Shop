import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Interface/category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}
  CategoryId: string | null = '';
  CategoryDetails: ICategory = {} as ICategory;

  ngOnInit(): void {
    //Consume Category Id
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.CategoryId = params.get('id');
      },
    });

    //Call API
    this._ProductsService.getCategoryById(this.CategoryId).subscribe({
      next: (response) => {
        this.CategoryDetails = response.data;
        console.log(this.CategoryDetails);
      },
    });
  }
}
