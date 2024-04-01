import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserData } from '../Interface/userdata';
@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  constructor(private _HttpClient: HttpClient) {}

  //variables
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  //ADD PRODUCT TO CART
  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: prodId,
      }
    );
  }

  //GET CART PRODUCTS-Get Logged user cart
  getCartProducts(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  //REMOVE PRODUCT FROM CART
  removeCartProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    );
  }

  //UPDATE COUNT OF PRODUCT IN CART COMPONENT
  updateCount(count: number, productId: string): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count,
      }
    );
  }

  // CHECKOUT FOR PAYMENT
  checkout(cartId: string, userData: IUserData): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        shippingAddress: userData,
      }
    );
  }
}
