import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Register } from '../models/register.model';

@Injectable()
export class AccountService {

  private readonly baseUrl: string;

  constructor(private httpService: HttpService) {
    this.baseUrl = '/user';
  }

  public create(model: Register): Observable<any> {
    return this.httpService.post(`${this.baseUrl}/create`, model)
  }
}
