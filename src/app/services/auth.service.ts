import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface TokenRes {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static TOKEN_KEY_NAME = "access_token";

  constructor(public jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(AuthService.TOKEN_KEY_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return getJWTToken();
  }

  // 传入的token必须是合法的
  setToken(token:string) {
    localStorage.setItem(AuthService.TOKEN_KEY_NAME, token);
  }
}

export function getJWTToken() :string | null{
  return localStorage.getItem(AuthService.TOKEN_KEY_NAME);
}
