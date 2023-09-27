import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription, catchError, delay, finalize, tap } from 'rxjs';
import { AuthService } from 'src/app/core/resources/service/auth.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  error!: string;
  isLoading!: boolean;
  private subscribe = new Subscription();
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  matcher = new MyErrorStateMatcher();

  register() {
    this.isLoading = true;
    const credentials = this.registerForm.value
    console.log('register', credentials);
    this.subscribe = this.authService
      .register(credentials)
      .pipe(
        delay(1500),
        tap(() => this.router.navigate(['/login'])),
        finalize(() => (this.isLoading = false)),
        catchError(error => (this.error = error))
      )
      .subscribe(
        {
          next: (value) => console.log(value)
        }
      );
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
