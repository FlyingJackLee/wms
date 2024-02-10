import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {ToastService} from "../services/toast.service";

/**
 * 设置统一的请求头, 统一的错误厝里
 */
@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private toast:ToastService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const apiReq = req.clone({ url: `http://127.0.0.1:8080/${req.url}` });
      return next.handle(apiReq).pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status){
            case 0: this.toast.push("网络错误，请重试", "error"); break;
            case 500: this.toast.push("服务器未响应，请联系客服或稍后尝试", "error"); break;
            case 400: this.toast.push(error.error['error'] ? error.error['error'] : error.error, "error"); break
          }
          return throwError(() => new Error('Something bad happened; please try again later.'));
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.toast.push("网络错误，请重试", "error");
    }
    else if (error.status === 400){
      this.toast.push(error.error['error'], "error");

    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
