import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class myHttpInterceptor implements HttpInterceptor {
  constrcutor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //check if the token is exist
    // true => send token with every request

    if (localStorage.getItem('token') !== null) {
      const myToken: any = localStorage.getItem('token');
      request = request.clone({
        setHeaders: {
          token: myToken,
        },
      });
    }
    return next.handle(request);
  }
}
