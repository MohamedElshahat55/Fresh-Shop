import { Component, Renderer2 } from '@angular/core';
import { CartDataService } from '../../Services/cart-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts: any;

  constructor(
    private _CartDataService: CartDataService,
    private _Renderer2: Renderer2
  ) {}

  // Get all Cart Products
  ngOnInit(): void {
    this._CartDataService.getCartProducts().subscribe({
      next: (res) => {
        this.cartProducts = res.data;
        console.log(res);
      },
    });
  }

  removeProduct(id: string) {
    this._CartDataService.removeCartProduct(id).subscribe({
      next: (res) => {
        this.cartProducts = res.data;
        this._CartDataService.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  //ChangeCount Method
  changeCount(
    count: number,
    productId: string,
    el1: HTMLButtonElement,
    el2: HTMLButtonElement
  ): void {
    // this condithin till the quantity never reach to zero
    if (count >= 1) {
      // add attribut by Rendere2
      this._Renderer2.setAttribute(el1, 'disabled', 'true');
      this._Renderer2.setAttribute(el2, 'disabled', 'true');
      this._CartDataService.updateCount(count, productId).subscribe({
        next: (res) => {
          this.cartProducts = res.data;
          this._Renderer2.removeAttribute(el1, 'disapled');
          this._Renderer2.removeAttribute(el2, 'disapled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(el1, 'disapled');
          this._Renderer2.removeAttribute(el2, 'disapled');
          console.log(err);
        },
      });
    }
  }
}
