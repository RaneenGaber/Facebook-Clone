import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { APIResponse } from '../schema/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {
  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      })
    };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  addHeaders(key: string, value: string) {
    this.httpOptions.headers.set(key, value);
  }

  getAll(APIRoute: string ,userId:number): Observable<APIResponse<any>> {
    return this.httpClient
      .get<APIResponse<any>>(`/api/${APIRoute}/${userId}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getAllById(APIRoute: string, id: number, userId: number): Observable<APIResponse<any>> {
    return this.httpClient
      .get<APIResponse<any>>(`/api/${APIRoute}/${id}/${userId}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );

  }

  getById(APIRoute: string,id: number): Observable<APIResponse<any>> {
    return this.httpClient
      .get<APIResponse<any>>(`/api/${APIRoute}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(APIRoute: string, body: any, userId: number): Observable<APIResponse<any>> {
    return this.httpClient
      .post<APIResponse<any>>(`/api/${APIRoute}/${userId}`, JSON.stringify(body), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  share(APIRoute: string, body: any, userId: number, sharePostId: number): Observable<APIResponse<any>> {
    return this.httpClient
      .post<APIResponse<any>>(`/api/${APIRoute}/${sharePostId}/${userId}`, JSON.stringify(body), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  update(APIRoute: string, id: any, body: any, userId: number): Observable<APIResponse<any>> {
    return this.httpClient
      .put<APIResponse<any>>(`/api/${APIRoute}/${id}/${userId}`, JSON.stringify(body), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  delete(APIRoute: string, id: any, userId: number): Observable<APIResponse<any>> {
    return this.httpClient
      .delete<APIResponse<any>>(`/api/${APIRoute}/${id}/${userId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
