import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { tap, delay, finalize, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { AuthService } from './../../../../core/resources/service/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  hide = true;
  error!: string;
  isLoading!: boolean ;

  private subscribe = new Subscription();
  loginForm:FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),

    })
  }

  matcher = new MyErrorStateMatcher();

  login() {
    this.isLoading = true;
    const credentials = this.loginForm.value
    this.subscribe = this.authService
      .login(credentials)
      .pipe(
        delay(1500),
        tap(() => this.router.navigate(['/home'])),
        finalize(() => (this.isLoading = false)),
        catchError(error => (this.error = error))
      )
      .subscribe(
        {
          next:(value)=> console.log(value)
        }
      );
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
