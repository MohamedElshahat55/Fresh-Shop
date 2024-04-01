import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  //CTOR
  constructor(private _HttpClient: HttpClient) {}
  //VARIBLES
  baseURL: string = 'https://ecommerce.routemisr.com/api/v1';

  //BEHAVIOUR SUBJECT
  wishlisCount: BehaviorSubject<number> = new BehaviorSubject(0);

  // ADD PRODUCT TO WISHLIST
  AddProductToWishlist(productId: string | null): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/wishlist`, {
      productId: productId,
    });
  }

  // GET PRODUCTS OF WISHLIST
  getAllWishlistProducts(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/wishlist`);
  }

  // DELETE PRODUCT FROM WISHLIST
  removeproductFromWishlist(productId: string | null): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/wishlist/${productId}`);
  }
}
