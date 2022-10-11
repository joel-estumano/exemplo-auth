import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from 'src/app/index/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private refreshTokenTimeout: any = null;

  constructor(private httpService: HttpService, private router: Router) {}

  public get tokenValue(): any {
    return this.subject.value;
  }

  login(user: any) {
    return this.httpService.post(`/auth/login`, user).pipe(
      map((response) => {
        this.startRefreshTokenTimer(response);
        return response;
      })
    );
  }

  refreshToken() {
    return this.httpService
      .post(`/auth/refresh-token?token=${this.tokenValue}`, {})
      .pipe(
        map((response) => {
          this.startRefreshTokenTimer(response);
          return response;
        })
      );
  }

  logout() {
    this.stopRefreshTokenTimer();
    this.subject.next(null);
    this.router.navigate(['account']);
  }

  private startRefreshTokenTimer(response: any) {
    this.subject.next(response.access_token);
    const decode = this.decodeTokenJWT();
    const expires = new Date(decode.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  private decodeTokenJWT(): any {
    try {
      return jwt_decode(this.tokenValue);
    } catch (Error) {
      return null;
    }
  }

  public getLoggedInUser() {
    const user: User = this.decodeTokenJWT();
    return user;
  }
}
