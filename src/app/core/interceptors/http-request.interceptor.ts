import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.tokenValue;
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set(`Authorization`, `Bearer ${token}`),
      });
    }

    return next
      .handle(request)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      )
      .pipe(
        map((response: any) => {
          if (response instanceof HttpResponse) {
          }
          return response;
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error has occurred`, error.error.message);
    } else {
      console.error(
        `Error code ${error.status}`,
        `Error: ${JSON.stringify(error.error)}`
      );

      if (error.status === 401) {
        this.authService.refreshToken().subscribe({
          next: (response: any) => {
            window.location.reload();
          },
          error: (erro: any) => {
            console.log(erro);
            //Logout from account or do some other stuff
          },
          complete: () => {},
        });
      }
    }
    return throwError(() => error.error.error.message);
  }
}
