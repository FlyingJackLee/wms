import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup, FormGroupDirective,
  FormsModule, NgForm,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {Router, RouterModule} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";
import {
  finalize,
  fromEvent,
  interval,
  map,
  mapTo,
  Observable,
  take,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
  timer
} from "rxjs";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastService} from "../../../services/toast.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";

interface ForgetForm {
  email: FormControl<string>;
  code: FormControl<string>;
  password: FormControl<string>;
  confirmPassword:  FormControl<string>;
}

const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { passwordNotMatched: true };
};
export class PasswordConfirmMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form && form.errors?.['passwordNotMatched'];
  }
}

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  hidePassword: boolean = true;

  codeSendCount: number = 0;
  showSubmitButton: boolean = true

  // 因为passwordConfirmValidator是cross validator，因此mat-field无法得知confirmPassword字段是否valid，所以我们需要重写他的matcher
  // 以告诉field具体的error state判断方式
  passwordConfirmMatcher = new PasswordConfirmMatcher();

  forgetForm = new FormGroup<ForgetForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email ]}),
    code: new FormControl('',  { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\S{8,16}$')]}),
    confirmPassword: new FormControl('', { nonNullable: true , validators: [Validators.required]})
  }, { validators : [confirmPasswordValidator]});

  constructor(private userService:UserService,
              private toast: ToastService,
              public router: Router) {
  }

  sendCode() {
    this.codeSendCount = 60;

    if (this.forgetForm.value.email) {
      this.userService.sendCodeToEmail(this.forgetForm.value.email).subscribe(
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

  submit(){
    this.showSubmitButton = false //完成前屏蔽button
    if (this.forgetForm.valid) {
      this.userService.resetByEmail(this.forgetForm.value.email!, this.forgetForm.value.password!, this.forgetForm.value.code!)
        .pipe(finalize(() => this.showSubmitButton = true))
        .subscribe( {
          next: data => { if( data === "success" ) this.toast.push("重置成功", "success"); },
          complete: () => this.router.navigate(['/user/login'])
        });
    }
  }
}
