import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { User } from 'src/app/index/interfaces/user.interface';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  public user: User;

  constructor(private auth: AuthService) {
    this.user = this.auth.getLoggedInUser();
  }

  ngOnInit(): void {}
}
