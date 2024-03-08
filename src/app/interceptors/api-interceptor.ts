import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {ToastService} from "../services/toast.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment"
/**
 * 设置统一的请求头, 统一的错误厝里
 */
@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private toast:ToastService,
              private auth:AuthService,
              private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${environment.apiUrl}/${req.url}` });
     return next.handle(apiReq).pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status){
            case 0: this.toast.push("网络错误，请重试", "error"); break;
            case 500: this.toast.push("服务器未响应，请联系客服或稍后尝试", "error"); break;
            case 401:
              // 服务器未授权的请求，需要清除token并跳转登陆
              this.toast.push("验证信息失效，请重新登陆", "error");
              this.auth.clear();
              this.router.navigate(['/user/login']);
              break;
            case 400: this.toast.push(error.error['error'] ? error.error['error'] : error.error, "error"); break
          }
          return throwError(() => new Error('Something bad happened; please try again later.'));
        })
      );
  }
}
