import { loadingInterceptor } from './Interceptors/loading.interceptor';
import { myHttpInterceptor } from './Interceptors/my-http.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { CartComponent } from './Component/cart/cart.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { BrandsComponent } from './Component/brands/brands.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { NotfoundComponent } from './Component/notfound/notfound.component';
import { FooterComponent } from './Component/footer/footer.component';
import { ProductsComponent } from './Component/products/products.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CuttextPipe } from './Pipes/cuttext.pipe';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { AuthNavbarComponent } from './Component/auth-navbar/auth-navbar.component';
import { BlankNavbarComponent } from './Component/blank-navbar/blank-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaymentComponent } from './Component/payment/payment.component';
import { OrdersComponent } from './Component/orders/orders.component';
import { SearchPipe } from './Pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryDetailsComponent } from './Component/category-details/category-details.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { BrandDetailsComponent } from './Component/brand-details/brand-details.component';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { errorInterceptor } from './Interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CategoriesComponent,
    BrandsComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    FooterComponent,
    ProductsComponent,
    CuttextPipe,
    SearchPipe,
    ProductDetailsComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    AuthNavbarComponent,
    BlankNavbarComponent,
    PaymentComponent,
    OrdersComponent,
    CategoryDetailsComponent,
    WishlistComponent,
    BrandDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: myHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: loadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
