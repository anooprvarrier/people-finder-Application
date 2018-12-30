import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth-service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginUser: User;
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private toasterService: ToastrService
  ) { }

  ngOnInit() {
    this.intializeForm();
  }
  private intializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    });
  }
  login(): void {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe((user: User) => this.loginUser = user);
    if (this.loginUser) {
      this.toasterService.success("Login Successful...");
      this.router.navigate(["/home"]);
    }
  }
}
