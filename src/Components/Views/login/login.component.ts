import { Component } from '@angular/core';
import { UserModel } from '../../../Interfaces/Models/UserModel';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../Services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoginRequest } from '../../../Interfaces/DTO/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule
  ]
})
export class Login {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  // regex = "^((?=.*\\d)|(?=.*[^a-zA-Z0-9]))+(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required, Validators.minLength(6)]);

  constructor(private authService: AuthenticationService, private matDialog: MatDialog, private router: Router) {
  }

  submitLogin() {
    let login: LoginRequest = {email: this.username.value!, password: this.password.value!};
    this.authService.getToken(login);
    this.router.navigateByUrl("/");
  };

  getEmailErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    };

    return this.username.hasError('email') ? 'Not a valid email' : '';
  };

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.password.hasError("minlength")) {
      return 'Password must be atleast 6 characters'
    };

    return this.password.hasError('minlength') ? 'Must be atleast 6 characters' : '';
  };
};
