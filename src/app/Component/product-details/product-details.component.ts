import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../Interface/product';
import { CartDataService } from '../../Services/cart-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = '';
  productDetails: Product | null = null;
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartDataService: CartDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
    });

    this._ProductsService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
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

  ProductDetailsSilder: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    items: 1,
    nav: true,
    autoWidth: true,
  };
}
