import {Injectable} from '@angular/core';
import {TokenRes} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {UserProfile} from "../models/profile";
import {Authority, Role} from "../models/authority";
import {ApiRes} from "../models/ApiRes";

export enum PrincipalType{
  PHONE = "phone", EMAIL = "email"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public profile = new BehaviorSubject<UserProfile>({
    "userId": -1,
    "nickname": "未设置",
    "email": "",
    "phoneNumber": "",
    "avatar": "default"
  });

  public role = new BehaviorSubject<Role>(Role.BLANK);
  public permissions = new BehaviorSubject<Authority[]>([]);

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
   * 手机号登陆
   *
   * @param username
   * @param password
   * @return 返回token: {token:$token}
   */
  loginByPhone(phone: string, password: string):Observable<TokenRes>{
    let queryParas = new HttpParams().set("phone", phone).set("password", password);
    return this.http.post<TokenRes>('login/phone', null, { params: queryParas});
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
   * 验证码通用注册
   *
   * @param principal
   * @param type
   */
  signUpByCode(principal: string, password: string, code: string, type: PrincipalType): Observable<ApiRes> {
    switch (type){
      case PrincipalType.PHONE: return this.signupByPhone(principal, password, code);
      case PrincipalType.EMAIL: return this.signupByEmail(principal, password, code);
      default: return this.signupByEmail(principal, password, code);
    }
  }

  /**
   * 通过用户名注册
   *
   * @param username
   * @param password
   */
  signupByUsername(username: string, password: string): Observable<ApiRes>{
    let queryParas = new HttpParams().set("username", username).set("password", password);
    return this.http.post<ApiRes>('signup/username', null, { params: queryParas});
  }

  /**
   * 通过邮件注册
   *
   * @param email
   * @param password
   * @param code
   */
  signupByEmail(email: string, password: string, code: string): Observable<ApiRes>{
    let queryParas = new HttpParams().set("email", email).set("password", password).set("code", code);
    return this.http.post<ApiRes>('signup/email', null, { params: queryParas});
  }

  /**
   * 通过手机注册
   *
   * @param phone
   * @param password
   * @param code
   */
  signupByPhone(phone: string, password: string, code: string): Observable<ApiRes>{
    let queryParas = new HttpParams().set("phone", phone).set("password", password).set("code", code);
    return this.http.post<ApiRes>('signup/phone', null, { params: queryParas});
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
   * 通过邮箱重置密码
   *
   * @param phone
   * @param password
   * @param code 邮箱验证码
   */
  resetByPhone(phone: string, password: string, code: string): Observable<string> {
    let queryParas = new HttpParams().set("phone", phone).set("password", password).set("code", code);
    return this.http.post('user/reset/phone', null, { responseType: "text", params: queryParas});
  }

  /**
   * 根据principal类型发送验证码
   *
   * @param principal
   * @param type
   */
  sendCode(principal: string, type: PrincipalType): Observable<ApiRes> {
    switch (type){
      case PrincipalType.PHONE: return this.sendCodeToPhone(principal);
      case PrincipalType.EMAIL: return this.sendCodeToEmail(principal);
      default: return this.sendCodeToEmail(principal);
    }
  }

  /**
   * 发送邮箱验证码
   *
   * @param email
   */
  sendCodeToEmail(email: string): Observable<ApiRes> {
    let queryParas = new HttpParams().set("email", email);
    return this.http.get<ApiRes>('user/code/email', { params: queryParas});
  }

  /**
   * 发送手机验证码
   *
   * @param phone
   */
  sendCodeToPhone(phone: string): Observable<ApiRes> {
    let queryParas = new HttpParams().set("phone", phone);
    return this.http.get<ApiRes>('user/code/phone', { params: queryParas});
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

  /**
   * 检查手机号是否被使用
   *
   * @param phone
   */
  checkPhone(phone: string): Observable<boolean> {
    let queryParas = new HttpParams().set("phone", phone);
    return this.http.get<boolean>('user/check/phone', { params: queryParas});
  }

  /**
   * 获取用户档案
   */
  getProfile():Observable<UserProfile> {
    return this.profile.asObservable();
  }
  refreshProfile(){
    this.http.get<UserProfile>('profile/').subscribe(
      data => this.profile.next(data)
    );
  }

  /**
   * 获取当前用户角色
   */
  getRole(): Observable<Role>{
    return this.role.asObservable();
  }

  /**
   * 获取当前用户权限
   */
  getPermissions(): Observable<Authority[]>{
    return this.permissions.asObservable();
  }

  refreshRole(){
    this.http.get<Authority>('profile/role').subscribe(
      data => this.role.next(data.authority as Role)
    )
  }

  refreshPermission(){
    this.http.get<Authority[]>('profile/permission').subscribe(
      data => this.permissions.next(data)
    );
  }

  /**
   * 更新nickname
   * @param nickname
   */
  updateNickname(nickname: string){
    let queryParas = new HttpParams().set("nickname", nickname);
    return this.http.put('profile/nickname', null,{ params: queryParas}).pipe(
      finalize(() => this.refreshProfile()) //完成后记得更新状态
    );
  }
}
