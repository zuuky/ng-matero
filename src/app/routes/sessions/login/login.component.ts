import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { ModelConsService } from '@shared/services/modelcons.service';
import { HttpService } from '@shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerUrl: string = ModelConsService.REGISTER_URL;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _token: TokenService,
    private _startup: StartupService,
    private _http: HttpService,
  ) {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.pattern('admin')]],
      password: ['', [Validators.required, Validators.pattern('admin-pwd')]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
  }

  loginBak() {
    // Set user info
    SettingsService.setUser({ name: this.username.value });
    // Set token info
    this._token.set({ token: 'ng-matero-token' });
    // Regain the initial data
    this._startup.load().then(() => {
      this._router.navigateByUrl('/').then();
    });
  }

  login() {
    this._http.post(ModelConsService.LOGIN_URL, this.loginForm.value, (res: any) => {
      SettingsService.setUser({ name: this.username.value });
      this._token.set({ token: res.data });
      this._startup.load().then(() => {
        this._router.navigateByUrl('/').then();
      });
    });
  }
}
