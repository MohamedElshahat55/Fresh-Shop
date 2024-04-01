import { Component } from '@angular/core';
import { BrandsService } from '../../Services/brands.service';
import { IBrand } from '../../Interface/brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  constructor(private _BrandsService: BrandsService) {}

  //VARIBLES
  brandsData: IBrand[] = [];
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brandsData = response.data;
        this.pageSize = response.metadata.limit; //limit
        this.currentPage = response.metadata.currentPage; //currentPage
        this.total = response.results; //total Products
      },
    });
  }

  pageChanged(event: any): void {
    this._BrandsService.getAllBrands(event).subscribe({
      next: (response) => {
        this.brandsData = response.data;
        this.pageSize = response.metadata.limit; //limit
        this.currentPage = response.metadata.currentPage; //currentPage
        this.total = response.results; //total Products
      },
    });
  }
}
