import { ToastrService } from 'ngx-toastr';
import { Product } from '../../Interface/product';
import { CartDataService } from '../../Services/cart-data.service';
import { WishlistService } from '../../Services/wishlist.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  //CTOR
  constructor(
    private _WishlistService: WishlistService,
    private _CartDataService: CartDataService,
    private toastr: ToastrService
  ) {}

  //VARIABLES
  wishlistProdcuts: Product[] = [];

  //HANDLE API
  ngOnInit(): void {
    this._WishlistService.getAllWishlistProducts().subscribe({
      next: (response) => {
        this.wishlistProdcuts = response.data;
        console.log(this.wishlistProdcuts);
      },
    });
  }

  //REMOVE PRODUCT FROM WISHLIST
  removeFromWishlist(productId: string): void {
    this._WishlistService.removeproductFromWishlist(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this._WishlistService.wishlisCount.next(res.data.length);
        this.wishlistProdcuts = res.data;
      },
    });
  }

  // ADD PRODUCT FROM WISHLIST PAGE
  addProduct(id: string) {
    this._CartDataService.addToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this._CartDataService.cartNumber.next(res.numOfCartItems);
      },
    });
  }
}
