import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlOptions,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
//import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // constructor(private _formBuilder:FormBuilder){}

  // RegisterForm = this._formBuilder.group({
  //   name:[''],
  //   email:[''],
  //   passward:[''],
  //   rePassward:[''],
  //   phone:['']
  // })

  erroMessage: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  RegisterForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]), // a_Z width 6
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  //CUSTOM VALIDATION FOR CONFIRM PASSWORD
  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (rePassword?.value === '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  isSubmitting: boolean = false;

  handelRegisterForm(): void {
    this.isSubmitting = true;
    if (this.RegisterForm.valid == true) {
      this._AuthService.register(this.RegisterForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this._Router.navigate(['/login']);
            this.isSubmitting = false;
          }
        },
        error: (err) => {
          this.erroMessage = err.error.message;
          this.isSubmitting = false;
        },
      });
    }
  }
}
