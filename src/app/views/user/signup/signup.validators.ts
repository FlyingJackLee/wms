import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, finalize, map, Observable, of} from "rxjs";
import {UserService} from "../../../services/user.service";

@Injectable({providedIn: "root"})
export class UsernameUniqueValidator implements AsyncValidator {
  // 通过lock防止短时间多次请求
  lock: boolean = false;
  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (this.lock) {
      return of(null);
    }

    return this.userService.checkUsername(control.value).pipe(
      map(isExist => isExist ? { uniqueUsernameViolate:true } : null),
      catchError(() => of(null)),
      finalize(() => this.lock = false)
    );
  }
}


@Injectable({providedIn: "root"})
export class EmailUniqueValidator implements AsyncValidator {
  // 通过lock防止短时间多次请求
  lock: boolean = false;
  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkEmail(control.value).pipe(
      map(isExist => isExist ? { uniqueEmailViolate:true } : null),
      catchError(() => of(null)),
      finalize(() => this.lock = false)
    );
  }
}
