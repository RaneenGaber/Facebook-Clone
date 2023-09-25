import { Injectable } from '@angular/core';
import { of, Observable, throwError, map } from 'rxjs';
import { LoginContextInterface } from '../models/login.context';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from 'src/app/data/schema/iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.serverUrl;
  helper = new JwtHelperService();
  currentUser: IUser = {
    id: null,
    name: null,
    image: null,
    email: null,
    facebook: null,
    phone: null,
    bio: null

  };
  constructor(private http: HttpClient) { }

  login(model: LoginContextInterface): Observable<IUser> {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const decodedToken = this.helper.decodeToken(response.token);

        this.currentUser.name = decodedToken.given_name;
        this.currentUser.email = decodedToken.email;
        this.currentUser.image = decodedToken.image;
        this.currentUser.phone = decodedToken.phone;
        this.currentUser.facebook = decodedToken.facebook;
        this.currentUser.bio = decodedToken.bio;


        localStorage.setItem('token', response.token);

        return this.currentUser;
      })
    );
  }

  isloggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    this.currentUser = {
      id: null,
      name: null,
      image: null,
      email: null,
      facebook: null,
      phone: null,
      bio: null
    };
    localStorage.removeItem('token');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  confirmEmail(model: any) {
    return this.http.post(this.baseUrl + 'confirm-email', model);
  }
}
