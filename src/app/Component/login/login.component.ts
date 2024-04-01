import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  erroMessage: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService
  ) {}

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]), // a_Z width 6
  });

  isSubmitting: boolean = false;

  handelLoginForm(): void {
    this.isSubmitting = true;
    if (this.LoginForm.valid == true) {
      this.spinner.show();
      this._AuthService.login(this.LoginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            //Token عبارة عن شوية معلومات عنك مفهاش الباسورد ولا الايميل ولكن بها معلومات عن كل مستخدم
            localStorage.setItem('token', res.token);
            // Before navigate to home must save the token in local storage
            this._AuthService.saveDate(); // بيفك التشفير وممكن اقدر استخدمها في عرض اسم المستخدم
            this._Router.navigate(['/home']);
            this.isSubmitting = false;
            this.spinner.hide();
          }
        },
        error: (err) => {
          this.erroMessage = err.error.message;
          this.isSubmitting = false;
          this.spinner.hide();
          console.log(err);
        },
      });
    }
  }
}
