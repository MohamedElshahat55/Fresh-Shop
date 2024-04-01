import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  //CTOR
  constructor(private _HttpClient: HttpClient) {}
  //VARIBLES
  baseURL: string = 'https://ecommerce.routemisr.com/api/v1';

  // GET ALL BRANDS
  getAllBrands(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/brands?page=${pageNumber}`);
  }
  // GET SPECIFIC BRAND BY ID
  getBrandsById(brandId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/brands/${brandId}`);
  }
}
