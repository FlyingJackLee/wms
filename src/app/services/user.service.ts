import {Injectable} from '@angular/core';
import {TokenRes} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {UserProfile} from "../models/profile";
import {Authority, Role} from "../models/authority";

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
