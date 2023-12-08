import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { ToastService } from "../services/toast.service";
import { Router } from "@angular/router";

/*
    解析服务器传来的RESTful体
*/
@Injectable()
export class ApiInteceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
                map((event:HttpEvent<any>) => this.handlerResponse(event)),
                catchError(err => this.handlerError(err))
            );
    }

    private handlerResponse(event:HttpEvent<any>): HttpEvent<any> {
        if (event instanceof HttpResponse) {
            // 注意clone方法只会在event.body.data有值的时候才会去替换
            return event.clone({
                body: event.body.data
            })
        }
        return event;
    }

    private handlerError(err: HttpErrorResponse) {
        this.router.navigate(["/404"]);
        return throwError(() => err);
    }
}