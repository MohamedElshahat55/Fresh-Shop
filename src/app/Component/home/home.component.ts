import { WishlistService } from '../../Services/wishlist.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../Services/products.service';

import { Product } from '../../Interface/product';
import { ICategory } from '../../Interface/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartDataService } from '../../Services/cart-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productsData: Product[] = [];
  CategoriesData: ICategory[] = [];
  wishlistProdcuts: Product[] = [];
  wishlistContent: string[] = []; // To toggle between the heart icons ["id","id","id"]
  searchInput: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _CartDataService: CartDataService,
    private _WishlistService: WishlistService,
    private toastr: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
        console.log(response.data);
      },
    });

    this._ProductsService.getCategories().subscribe({
      next: (response) => {
        this.CategoriesData = response.data;
        console.log(this.CategoriesData);
      },
    });

    this._WishlistService.getAllWishlistProducts().subscribe({
      next: (response) => {
        let numOfData: string[] = [];
        numOfData = response.data.map((item: any) => item.id);
        this.wishlistContent = numOfData;
      },
    });
  }

  addProduct(id: string) {
    this._CartDataService.addToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this._CartDataService.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  //Add PRODUCT FROM WISHLIST
  addProductToWishlist(id: string): void {
    this._WishlistService.AddProductToWishlist(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishlistContent = res.data;
        this._WishlistService.wishlisCount.next(res.data.length);
        console.log(res);
      },
    });
  }

  //REMOVE PRODUCT FROM WISHLIST
  removeFromWishlist(productId: string): void {
    this._WishlistService.removeproductFromWishlist(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishlistContent = res.data;
        this._WishlistService.wishlisCount.next(res.data.length);
        this.wishlistProdcuts = res.data;
      },
    });
  }

  //Owl Options
  CategoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    autoWidth: true,
  };

  MainSliderOptions: OwlOptions = {
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
