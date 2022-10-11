import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiURL: string;
  private readonly headers = { 'Content-Type': 'application/json' };

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  public get(url: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiURL}${url}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
  }

  public put(url: string, body: any): Observable<any> {
    return this.httpClient
      .put(`${this.apiURL}${url}`, body, {
        headers: this.headers,
      })
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
  }

  public path(url: string, body: any): Observable<any> {
    return this.httpClient
      .patch(`${this.apiURL}${url}`, body, {
        headers: this.headers,
      })
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
  }

  public post(url: string, body: any): Observable<any> {
    return this.httpClient
      .post(`${this.apiURL}${url}`, body, {
        headers: this.headers,
      })
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
  }

  public delete(url: string): Observable<any> {
    return this.httpClient
      .delete(`${this.apiURL}${url}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
