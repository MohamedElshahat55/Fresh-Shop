import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseURL: string = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private _HttpClient: HttpClient) {}

  //GET ALL PRODUCTS
  getProducts(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/products?page=${pageNumber}`);
  }

  //GET PRODUCTS BY ID
  getProductById(id: any): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/products/${id}`);
  }

  //GET ALL CATEGORIES
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/categories`);
  }

  //GET CATEGORY BY ID
  getCategoryById(catId: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/categories/${catId}`);
  }
}
