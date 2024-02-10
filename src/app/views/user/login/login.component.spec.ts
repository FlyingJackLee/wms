import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";
import {cold, getTestScheduler} from 'jasmine-marbles';
import {of} from "rxjs";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj("UserService", ["loginByUsername", "loginByEmail"]);
    authServiceMock = jasmine.createSpyObj("AuthService", ["setToken"]);

    TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock},
        { provide: AuthService, useValue: authServiceMock},
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should switch username/email when click button', () => {
    const principalInput: HTMLElement = fixture.debugElement.query(By.css("mat-label")).nativeElement;
    expect(principalInput.textContent).toEqual("用户名");
    expect(component.activatePrincipal).toEqual("username");

    const switchButton: DebugElement = fixture.debugElement.query(By.css(".form-container > button"));
    switchButton.triggerEventHandler('click')
    fixture.detectChanges();
    // 1. 先确保template渲染新的input
    expect(principalInput.textContent).toEqual("邮箱地址");
    // 2. 再确保component中值和form更新
    expect(component.activatePrincipal).toEqual("email");
    expect(component.loginForm.contains('username')).toBeFalse();
    expect(component.loginForm.contains('email')).toBeTrue();

    switchButton.triggerEventHandler('click')
    fixture.detectChanges();
    expect(principalInput.textContent).toEqual("用户名");
    expect(component.activatePrincipal).toEqual("username");
    expect(component.loginForm.contains('username')).toBeTrue();
    expect(component.loginForm.contains('email')).toBeFalse();
  });

  it('should display error when input illegal username', () => {
    const usernameInput: HTMLInputElement = fixture.debugElement.query(By.css("input")).nativeElement;
    // 触发输入以及control touch
    usernameInput.value = "";
    usernameInput.dispatchEvent(new Event('input'));
    component.principals.username.markAsTouched();
    fixture.detectChanges();

    const errorLabel: HTMLElement = fixture.debugElement.query(By.css("mat-error")).nativeElement;
    expect(errorLabel.textContent).toEqual("5-15位小写字母数字组成");

    usernameInput.value = "as.12x~!@ d";
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(errorLabel.textContent).toEqual("5-15位小写字母数字组成");
  });

  it('should display error when input illegal address', () => {
    fixture.debugElement.query(By.css(".form-container > button")).triggerEventHandler('click');
    fixture.detectChanges();

    const addressElement: HTMLInputElement = fixture.debugElement.query(By.css("input")).nativeElement;
    // 触发输入以及control touch
    addressElement.value = "";
    addressElement.dispatchEvent(new Event('input'));
    component.principals.email.markAsTouched();
    fixture.detectChanges();

    const errorLabel: HTMLElement = fixture.debugElement.query(By.css("mat-error")).nativeElement;
    expect(errorLabel.textContent).toEqual("邮箱地址不正确");

    addressElement.value = "notaemail";
    addressElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(errorLabel.textContent).toEqual("邮箱地址不正确");
  });


  it('should display error when password input is empty', () => {
    const passwordEle: HTMLInputElement = fixture.debugElement.query(By.css("[formControlName=password]")).nativeElement;
    passwordEle.value = "";
    passwordEle.dispatchEvent(new Event('input'));
    component.loginForm.controls['password'].markAsTouched();
    fixture.detectChanges();

    const errorLabel: HTMLElement = fixture.debugElement.query(By.css("mat-error")).nativeElement;
    expect(errorLabel.textContent).toEqual("8-16位非空字符");
  });

  it('should switch visible type of password', () => {
    const passwordEle: HTMLInputElement = fixture.debugElement.query(By.css("[formControlName=password]")).nativeElement;
    expect(component.hidePassword).toBeTrue();
    expect(passwordEle.type).toEqual("password");

    const passwordButton:DebugElement = fixture.debugElement.query(By.css("mat-form-field button"));
    passwordButton.triggerEventHandler("click");
    fixture.detectChanges();
    expect(component.hidePassword).toBeFalse();
    expect(passwordEle.type).toEqual("text");
  });


  it('should disable submit when form invalid and last submit has not been done', () => {
    const submitButtonDe: DebugElement = fixture.debugElement.query(By.css("[type=submit]"));
    // 1. form invalid
    expect(submitButtonDe.nativeElement.disabled).toBeTrue();
    expect(component.showSubmitButton).toBeTrue();

    // 2. form valid
    inputValidUsernamePassword();
    expect(submitButtonDe.nativeElement.disabled).toBeFalse();

    // 3. submit
    userServiceMock.loginByUsername.and.returnValue(cold('---x|', {x: {token:"faketoken"}}));
    component.submit();
    fixture.detectChanges();
    expect(component.showSubmitButton).toBeFalse();
    expect(submitButtonDe.nativeElement.disabled).toBeTrue();
    expect(userServiceMock.loginByUsername).toHaveBeenCalled();

    // 刷新同步操作
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.showSubmitButton).toBeTrue();
    expect(submitButtonDe.nativeElement.disabled).toBeFalse();
    expect(authServiceMock.setToken).toHaveBeenCalledWith("faketoken");
  });



  it('should set token when submit success', () => {
    // username 登陆测试
    userServiceMock.loginByUsername.and.returnValue(of({token: "faketoken"}));
    inputValidUsernamePassword();
    component.submit();
    expect(authServiceMock.setToken).toHaveBeenCalledOnceWith("faketoken");

    inputValidEmailPassword();
    expect(authServiceMock.setToken).toHaveBeenCalledOnceWith("faketoken");
  });


  function inputValidValue(principal:string) {
    const principalEle: HTMLInputElement = fixture.debugElement.query(By.css("input")).nativeElement;
    const passwordEle: HTMLInputElement = fixture.debugElement.query(By.css("[formControlName=password]")).nativeElement;
    principalEle.value = principal;
    principalEle.dispatchEvent(new Event('input'));

    passwordEle.value = "test123456";
    passwordEle.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function inputValidUsernamePassword() {
    inputValidValue("test001");
  }

  function inputValidEmailPassword() {
    fixture.debugElement.query(By.css(".form-container > button")).triggerEventHandler('click');
    fixture.detectChanges();
    inputValidValue("test001@test.com");
  }
});
