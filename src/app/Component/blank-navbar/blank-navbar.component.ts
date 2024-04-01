import { WishlistService } from '../../Services/wishlist.service';
import { CartDataService } from '../../Services/cart-data.service';
import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css',
})
export class BlankNavbarComponent {
  constructor(
    private _Router: Router,
    private _Renderer2: Renderer2,
    private _CartDataService: CartDataService,
    private _WishlistService: WishlistService,
    private _translate: TranslateService
  ) {
    // 1. get the current language from translate service
    this.lang = this._translate.currentLang; //----> 'en'
  }

  //Varibales
  cartCount: number = 0;
  wishlistcount: number = 0;
  lang: any = 'en';

  changeLanguage() {
    if (this.lang === 'en') {
      localStorage.setItem('lang', 'ar');
    } else {
      localStorage.setItem('lang', 'en');
    }
    window.location.reload();
  }

  @ViewChild('navBar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }

  ngOnInit(): void {
    //update the count of cart
    this._CartDataService.cartNumber.subscribe({
      next: (data) => {
        this.cartCount = data;
      },
    });

    //update the count of cart when the page reload for first time
    this._CartDataService.getCartProducts().subscribe({
      next: (res) => {
        this._CartDataService.cartNumber.next(res.numOfCartItems);
      },
    });

    //update the count of wishlist
    this._WishlistService.wishlisCount.subscribe({
      next: (data) => {
        this.wishlistcount = data;
        console.log('wishlistcount' + data);
      },
    });

    this._WishlistService.getAllWishlistProducts().subscribe({
      next: (res) => {
        this._WishlistService.wishlisCount.next(res.count);
      },
    });
  }

  signOut(): void {
    //امسح التوكن
    localStorage.removeItem('token');
    //مفروض بعد ام امسح التوكن اوديه لل login تاني
    this._Router.navigate(['/login']);
  }
}
