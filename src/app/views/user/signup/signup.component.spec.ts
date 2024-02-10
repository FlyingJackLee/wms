import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {EmailUniqueValidator, UsernameUniqueValidator} from "./signup.validators";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let toastMock: jasmine.SpyObj<ToastService>;
  let usernameValidatorMock: jasmine.SpyObj<UsernameUniqueValidator>;
  let emailValidatorMock: jasmine.SpyObj<EmailUniqueValidator>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj("UserService", ["checkEmail", "checkUsername", "signupByUsername", "signupByEmail"]);
    usernameValidatorMock = jasmine.createSpyObj("UsernameUniqueValidator", ["validate"]);
    usernameValidatorMock.validate.and.returnValue(of(null));

    emailValidatorMock = jasmine.createSpyObj("EmailUniqueValidator", ["validate"]);
    emailValidatorMock.validate.and.returnValue(of(null));

    toastMock = jasmine.createSpyObj("ToastService", ["push"]);
    await TestBed.configureTestingModule({
      imports: [SignupComponent, RouterTestingModule, NoopAnimationsModule, MatButtonModule, MatDividerModule,
        MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock},
        { provide: ToastService, useValue: toastMock},
        { provide: UsernameUniqueValidator, useValue: usernameValidatorMock},
        { provide: EmailUniqueValidator, useValue: emailValidatorMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    spyOn(component.router, "navigate")

    fixture.detectChanges();
  });

  it('should switch form when click switch button', () => {
    // 1. 初始状态下是username
    const usernameDef = fixture.debugElement.query(By.css("[formControlName=username]"));
    expect(usernameDef).toBeTruthy();
    expect(component.activateForm).toBe(component.usernameSignupForm);

    // 2. 切换到email测试
    const switchDef = fixture.debugElement.query(By.css(".form-container > button"));
    switchDef.triggerEventHandler("click");
    fixture.detectChanges();

    expect(component.activateForm).toBe(component.emailSignupForm);
    const emailDef = fixture.debugElement.query(By.css("[formControlName=email]"));
    expect(emailDef).toBeTruthy();
  });

  it('should show username error when input username is invalid', fakeAsync(() => {
    const usernameField = component.usernameSignupForm.controls.username;
    // 1. username格式错误
    usernameField.setValue("");
    usernameField.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll("mat-error")[0].innerText).toContain("5-15位小写字母数字组成")

    // 2. username已存在
    usernameValidatorMock.validate.and.returnValue(of({ uniqueUsernameViolate:true }));
    usernameField.setValue("test001");
    usernameField.markAsTouched();
    tick(1000);
    fixture.detectChanges();
    expect(usernameValidatorMock.validate).toHaveBeenCalled();
    expect(component.usernameSignupForm.controls.username.hasError("uniqueUsernameViolate")).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll("mat-error")[0].innerText).toContain("用户名已经存在")
  }));

  it('should show email error when input email is invalid', fakeAsync(() => {
    component.activateForm = component.emailSignupForm;
    fixture.detectChanges();

    const emailField = component.emailSignupForm.controls.email;
    // 1. email格式错误
    emailField.setValue("notaemail");
    component.emailSignupForm.markAsTouched();
    fixture.detectChanges();
    expect(emailField.hasError("email")).toBeTrue();

    // 2. email已存在
    emailValidatorMock.validate.and.returnValue(of({ uniqueEmailViolate:true }));
    emailField.setValue("test@test.com");
    emailField.markAsTouched();
    tick(1000);
    fixture.detectChanges();
    expect(emailValidatorMock.validate).toHaveBeenCalled();
    expect(component.emailSignupForm.controls.email.hasError("uniqueEmailViolate")).toBeTrue();
  }));

  it('should check and confirm two password', () => {
    const passwordField = component.activateForm.controls['password'];

    passwordField.setValue("abc");
    component.activateForm.markAsTouched();
    fixture.detectChanges();
    expect(passwordField.hasError("pattern")).toBeTrue();

    passwordField.setValue("abcd123456");
    const passwordConfirmField = component.activateForm.controls['confirmPassword'];
    passwordConfirmField.setValue("notsame123")
    expect(component.activateForm.hasError("passwordNotMatched")).toBeTrue();
  });

  it('should send valid information form when submit', () => {
    userServiceMock.signupByUsername.and.returnValue(of("success"));
    userServiceMock.signupByEmail.and.returnValue(of("success"));

    component.usernameSignupForm.controls.username.setValue("test001");
    component.activateForm.controls['password'].setValue("abcd12345");
    component.activateForm.controls['confirmPassword'].setValue("abcd12345");
    component.activateForm.markAsTouched();
    component.submit();
    expect(userServiceMock.signupByUsername).toHaveBeenCalled();

    component.switchPrincipalField();
    component.emailSignupForm.controls.email.setValue("test@test.com");
    component.emailSignupForm.controls.code.setValue("test123");
    component.activateForm.controls['password'].setValue("abcd12345");
    component.activateForm.controls['confirmPassword'].setValue("abcd12345");
    component.activateForm.markAsTouched();
    component.submit();
    expect(userServiceMock.signupByEmail).toHaveBeenCalled();
  });
});
