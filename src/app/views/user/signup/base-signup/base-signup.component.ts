import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {PreventEnterDirective} from "../../../../directives/prevent-enter.directive";
import {ErrorStateMatcher} from "@angular/material/core";
import {finalize, interval, takeWhile} from "rxjs";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {PrincipalType, UserService} from "../../../../services/user.service";

interface BaseSignupForm {
  principal: FormControl<string>;
  password: FormControl<string>;
  confirmPassword:  FormControl<string>;
  code: FormControl<string>;
}

/**
 * 密码确认验证器
 * 验证失败时返回{ passwordNotMatched: true } error
 *
 * @param control
 */
const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { passwordNotMatched: true };
};

/**
 * 替换默认的密码追踪。保证form field能够追踪上面的错误
 */
export class PasswordConfirmMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form && form.errors?.['passwordNotMatched'];
  }
}

@Component({
  selector: 'app-base-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    PreventEnterDirective
  ],
  templateUrl: './base-signup.component.html',
  styleUrl: './base-signup.component.scss'
})
export class BaseSignupComponent implements OnChanges, OnInit{
  codeSendCount = 0;

  // 动态切换的验证用部分
  @Input() principal!: FormControl<string>;
  // 根据这里的类型判断应该怎么查找服务
  @Input() principalType!: PrincipalType;
  @Input() principalTitle!: string;

  code = new FormControl('',  { nonNullable: true, validators: [Validators.required] });
  password = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\S{8,16}$')]});
  confirmPassword = new FormControl('', { nonNullable: true , validators: [Validators.required]});

  signupForm!:FormGroup<BaseSignupForm>;

  hidePassword = true;
  passwordConfirmMatcher = new PasswordConfirmMatcher();

  showSubmitButton = true;

  constructor(private toast: ToastService,
              public router: Router,
              public userService:UserService
  ) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup<BaseSignupForm>({
      principal: this.principal,
      code: this.code,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {validators: confirmPasswordValidator});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.signupForm){
      this._refreshForm();
      this.signupForm.reset();
    }
  }

  /**
   * 发送验证码，会有60秒的限制
   */
  sendCode() {
    this.codeSendCount = 60;
    if (this.signupForm.value.principal) {
      this.userService.sendCode(this.signupForm.value.principal, this.principalType).subscribe(
        data => this.toast.push("发送成功", "information")
      );
    }

    // 限制60秒只能按一次
    interval(1000).pipe(
      takeWhile(value => value < 60)
    ).subscribe({
      next: data => {
        this.codeSendCount--;
      },
      complete: () => this.codeSendCount = 0
    });
  }

  /**
   * 提交表单
   */
  submit() {
    this.showSubmitButton = false //完成前屏蔽button
    if (this.signupForm.valid) {
      this.userService.signUpByCode(this.signupForm.value.principal!, this.signupForm.value.password!, this.signupForm.value.code!, this.principalType).pipe(finalize(() => this.showSubmitButton = true))
        .subscribe( {
          next: data => this.toast.push("注册成功", "success"),
          complete: () => this.router.navigate(['/user/login'])
        });
    }
    else {
      this.showSubmitButton = true
    }
  }

  _refreshForm(){
    this.signupForm = new FormGroup<BaseSignupForm>({
      principal: this.principal,
      code: this.code,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {validators: confirmPasswordValidator});
  }
}
