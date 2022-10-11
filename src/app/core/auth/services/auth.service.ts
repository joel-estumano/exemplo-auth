import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpService } from '../../services/http.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from 'src/app/index/interfaces/user.interface';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject: BehaviorSubject<any>;

  private refreshTokenTimeout: any = null;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    this.subject = new BehaviorSubject<any>(
      this.sessionStorageService.retrieve('token')
    );
  }

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

  private startRefreshTokenTimer(response: any) {
    this.sessionStorageService.store('token', response.access_token);
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

  logout() {
    this.stopRefreshTokenTimer();
    this.sessionStorageService.clear('token');
    this.subject.next(null);
    this.router.navigate(['account']);
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
