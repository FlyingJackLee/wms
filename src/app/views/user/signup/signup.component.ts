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
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ErrorStateMatcher} from "@angular/material/core";
import {Router, RouterModule} from "@angular/router";
import {finalize, interval, takeWhile} from "rxjs";
import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {EmailUniqueValidator, UsernameUniqueValidator} from "./signup.validators";

interface BaseSignupForm {
  password: FormControl<string>;
  confirmPassword:  FormControl<string>;
}

interface UsernameSignupForm extends BaseSignupForm{
  username: FormControl<string>;
}

interface EmailSignupForm extends BaseSignupForm {
  email: FormControl<string>;
  code: FormControl<string>;
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
  selector: 'app-signup',
  standalone: true,
    imports: [
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        ReactiveFormsModule
    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  usernameSignupForm = new FormGroup<UsernameSignupForm>({
    username: new FormControl("", {
      nonNullable: true,
      validators:[Validators.required, Validators.pattern('^[a-z0-9]{5,15}$')],
      asyncValidators: [ this.usernameUniqueValidator.validate.bind(this.usernameUniqueValidator) ],
      updateOn: "blur"
    }),
    password: new FormControl('', { nonNullable:true , validators: [Validators.required, Validators.pattern('^\\S{8,16}$')]}),
    confirmPassword: new FormControl('', { nonNullable: true , validators: [Validators.required]})
  }, {validators: confirmPasswordValidator});

  emailSignupForm = new FormGroup<EmailSignupForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      asyncValidators: [ this.emailUniqueValidator.validate.bind(this.emailUniqueValidator) ],
      updateOn: "blur"
    }),
    code: new FormControl('',  { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^\\S{8,16}$')]}),
    confirmPassword: new FormControl('', { nonNullable: true , validators: [Validators.required]})
  }, {validators: confirmPasswordValidator});

  activateForm: FormGroup = this.usernameSignupForm;
  hidePassword: boolean = true;
  showSubmitButton: boolean = true;

  codeSendCount: number = 0;

  passwordConfirmMatcher = new PasswordConfirmMatcher();

  constructor(private userService:UserService,
              private toast: ToastService,
              public router: Router,
              private usernameUniqueValidator:UsernameUniqueValidator,
              private emailUniqueValidator:EmailUniqueValidator
  ) {
  }

  switchPrincipalField() {
    this.activateForm = this.activateForm === this.usernameSignupForm ? this.emailSignupForm : this.usernameSignupForm;
  }

  sendCode() {
    this.codeSendCount = 60;

    if (this.emailSignupForm.value.email) {
      this.userService.sendCodeToEmail(this.emailSignupForm.value.email).subscribe(
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

  submit() {
    this.showSubmitButton = false //完成前屏蔽button
    if (this.activateForm === this.usernameSignupForm && this.usernameSignupForm.valid) {
      this.userService.signupByUsername(this.usernameSignupForm.value.username!, this.usernameSignupForm.value.password!)
        .pipe(finalize(() => this.showSubmitButton = true))
        .subscribe( {
          next: data => { if( data === "success" ) this.toast.push("注册成功", "success"); },
          complete: () => this.router.navigate(['/user/login'])
        });
    }
    else if(this.activateForm === this.emailSignupForm && this.emailSignupForm.valid) {
      this.userService.signupByEmail(this.emailSignupForm.value.email!, this.emailSignupForm.value.password!, this.emailSignupForm.value.code! )
        .pipe(finalize(() => this.showSubmitButton = true))
        .subscribe( {
          next: data => { if( data === "success" ) this.toast.push("注册成功", "success"); },
          complete: () => this.router.navigate(['/user/login'])
        });

    } else {
      this.showSubmitButton = true
    }
  }
}
