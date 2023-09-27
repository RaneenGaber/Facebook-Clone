import { Injectable } from '@angular/core';
import { of, Observable, throwError, map } from 'rxjs';
import { LoginContextInterface } from '../models/login.context';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from 'src/app/data/schema/iuser';
import { RegisterContextInterface } from '../models/register-context-interface';


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
    createdAt:null,
    updatedAt:null,
    facebookUrl: null,
    phoneNumber: null,
    bio: null

  };
  constructor(private http: HttpClient) { }

  login(model: LoginContextInterface): Observable<IUser> {
    return this.http.post('/api/user/login', model).pipe(
      map((response: any) => {
        this.currentUser.id = response.user.id;
        this.currentUser.name = response.user.name;
        this.currentUser.email = response.user.email;
        this.currentUser.createdAt = response.user.createdAt;
        this.currentUser.updatedAt = response.user.updatedAt;
        this.currentUser.image = response.user.image;
        this.currentUser.phoneNumber = response.user.phoneNumber;
        this.currentUser.facebookUrl = response.user.facebookUrl;
        this.currentUser.bio = response.user.bio;

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
      createdAt: null,
      updatedAt: null,
      facebookUrl: null,
      phoneNumber: null,
      bio: null
    };
    localStorage.removeItem('token');
  }

  register(model: RegisterContextInterface): Observable<IUser> {
    return this.http.post('/api/user/add-user', model).pipe(
      (response: any) => {
        return response
      }
    );
  }

}
