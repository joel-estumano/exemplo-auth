import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public login: Login;
  public form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.login = new Login();
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      Object.assign(this.login, this.form.getRawValue());

      this.authService.login(this.login).subscribe({
        next: (response: any) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
    } else {
    }
  }
}
