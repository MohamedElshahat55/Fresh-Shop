import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { BrandsComponent } from './Component/brands/brands.component';
import { CartComponent } from './Component/cart/cart.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { NotfoundComponent } from './Component/notfound/notfound.component';
import { ProductsComponent } from './Component/products/products.component';
import { authGuard } from './Component/guards/auth.guard';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { PaymentComponent } from './Component/payment/payment.component';
import { OrdersComponent } from './Component/orders/orders.component';
import { CategoryDetailsComponent } from './Component/category-details/category-details.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { BrandDetailsComponent } from './Component/brand-details/brand-details.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'allorders',
        component: OrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'payment/:id',
        component: PaymentComponent,
        canActivate: [authGuard],
      },
      {
        path: 'catrgories',
        component: CategoriesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'category-details/:id',
        component: CategoryDetailsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [authGuard],
      },
      { path: 'brands', component: BrandsComponent, canActivate: [authGuard] },
      {
        path: 'brands/:id',
        component: BrandDetailsComponent,
        canActivate: [authGuard],
      },
      { path: 'cart', component: CartComponent, canActivate: [authGuard] },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
