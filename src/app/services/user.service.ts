import { Injectable } from '@angular/core';
import {AuthService, TokenRes} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) {}

  /**
   * 用户名方式登陆
   *
   * @param username
   * @param password
   * @return 返回token: {token:$token}
   */
  loginByUsername(username: string, password: string):Observable<TokenRes>{
    let queryParas = new HttpParams().set("username", username).set("password", password);
    return this.http.post<TokenRes>('login/username', null, { params: queryParas});
  }

  /**
   * 邮箱方式登陆
   *
   * @param email
   * @param password
   * @return 返回token: {token:$token}
   */
  loginByEmail(email: string, password: string):Observable<TokenRes>{
    let queryParas = new HttpParams().set("email", email).set("password", password);
    return this.http.post<TokenRes>('login/email', null, { params: queryParas});
  }

  /**
   * 通过用户名注册
   *
   * @param username
   * @param password
   */
  signupByUsername(username: string, password: string): Observable<string>{
    let queryParas = new HttpParams().set("username", username).set("password", password);
    return this.http.post('signup/username', null, { responseType: "text",  params: queryParas});
  }

  /**
   * 通过邮件注册
   *
   * @param email
   * @param password
   * @param code
   */
  signupByEmail(email: string, password: string, code: string): Observable<string>{
    let queryParas = new HttpParams().set("email", email).set("password", password).set("code", code);
    return this.http.post('signup/email', null, { responseType: "text", params: queryParas});
  }

  /**
   * 通过邮箱重置密码
   *
   * @param email
   * @param password
   * @param code 邮箱验证码
   */
  resetByEmail(email: string, password: string, code: string): Observable<string> {
    let queryParas = new HttpParams().set("email", email).set("password", password).set("code", code);
    return this.http.post('user/reset/email', null, { responseType: "text", params: queryParas});
  }

  /**
   * 发送邮箱验证码
   *
   * @param email
   */
  sendCodeToEmail(email: string): Observable<string> {
    let queryParas = new HttpParams().set("email", email);
    return this.http.get('user/code/email', { responseType: "text", params: queryParas});
  }

  /**
   * 检查用户名是否被使用
   *
   * @param username
   */
  checkUsername(username: string): Observable<boolean> {
    let queryParas = new HttpParams().set("username", username);
    return this.http.get<boolean>('user/check/username', { params: queryParas});
  }

  /**
   * 检查用户名是否被使用
   *
   * @param email
   */
  checkEmail(email: string): Observable<boolean> {
    let queryParas = new HttpParams().set("email", email);
    return this.http.get<boolean>('user/check/email', { params: queryParas});
  }
}
