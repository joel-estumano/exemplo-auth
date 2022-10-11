import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) {}

  isLoged(){
    return this.authService.tokenValue
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

}
