import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelConsService {
  static AUTH = 'auth';
  static LOGIN = 'login';
  static REGISTER = 'register';
  static MENU = 'menu';
  static ERROR = 'error';
  static MESSAGE = 'message';
  static CODE = 'code';
  static BODY = 'body';
  static USER_KEY = 'user';
  static TOKEN_KEY = 'token';
  static LOGIN_URL = '/' + ModelConsService.AUTH + '/' + ModelConsService.LOGIN;
  static REGISTER_URL = '/' + ModelConsService.AUTH + '/' + ModelConsService.REGISTER;
  static ERROR_404 = '/404';
  static ERROR_500 = '/500';
}
