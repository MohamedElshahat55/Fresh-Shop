import { Component } from '@angular/core';
import { Product } from '../../Interface/product';
import { ProductsService } from '../../Services/products.service';
import { ToastrService } from 'ngx-toastr';
import { CartDataService } from '../../Services/cart-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartDataService: CartDataService,
    private toastr: ToastrService
  ) {}

  productsData: Product[] = [];
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit; //limit
        this.currentPage = response.metadata.currentPage; //currentPage
        this.total = response.results; //total Products
      },
    });
  }
  addProduct(id: string) {
    this._CartDataService.addToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
      },
    });
  }

  pageChanged(event: any): void {
    this._ProductsService.getProducts(event).subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit; //limit
        this.currentPage = response.metadata.currentPage; //currentPage
        this.total = response.results; //total Products
      },
    });
  }
}
