import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../models/register.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public register: Register;
  public form: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.register = new Register();
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  clear() {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      Object.assign(this.register, this.form.getRawValue());
      this.accountService.create(this.register).subscribe({
        next: (response: any) => {
        
          this.goToLogin();
        },
        error: (erro) => {
         
        },
        complete: () => {},
      });
    } else {
     
    }
  }

  goToLogin() {
    this.router.navigate(['account']);
  }
}
