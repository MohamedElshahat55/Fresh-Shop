import { CartDataService } from '../../Services/cart-data.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUserData } from '../../Interface/userdata';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  constructor(
    private formBuilder: FormBuilder,
    private _CartDataService: CartDataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  cartId: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }
  paymentForm: FormGroup = this.formBuilder.group({
    details: [''],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  get phone() {
    return this.paymentForm.get('phone');
  }

  get city() {
    return this.paymentForm.get('city');
  }

  handelPaymentForm() {
    if (this.paymentForm.valid == true) {
      let userData: IUserData = this.paymentForm.value;
      this._CartDataService.checkout(this.cartId, userData).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url);
          }
        },
      });
    }
  }
}
