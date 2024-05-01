import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PhoneForgetComponent} from './phone-forget.component';
import {UserService} from "../../../../services/user.service";
import {ToastService} from "../../../../services/toast.service";
import {delay, of} from "rxjs";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";

describe('ForgetComponent', () => {
  let component: PhoneForgetComponent;
  let fixture: ComponentFixture<PhoneForgetComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let toastMock: jasmine.SpyObj<ToastService>;

  function triggerFormControl(formControlName: string, value: string): HTMLInputElement {
    const ele:HTMLInputElement = fixture.debugElement.query(By.css("[formControlName=" + formControlName + "]")).nativeElement;
    ele.value = value;
    ele.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return ele;
  }

  beforeEach( () => {
    userServiceMock = jasmine.createSpyObj("UserService", ["resetByEmail", "sendCodeToEmail"]);
    userServiceMock.sendCodeToEmail.and.returnValue(of("success"));
    userServiceMock.resetByEmail.and.returnValue(of("success"));

    toastMock = jasmine.createSpyObj("ToastService", ["push"]);

     TestBed.configureTestingModule({
      imports: [PhoneForgetComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock},
        { provide: ToastService, useValue: toastMock},
      ]
    });

    fixture = TestBed.createComponent(PhoneForgetComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');

    fixture.detectChanges();
  });

  it('should show error when filed is invalid', () => {
    triggerFormControl("email", "notaemail");
    expect(component.forgetForm.controls.email.invalid).toBeTrue();

    triggerFormControl("code", "");
    expect(component.forgetForm.controls.code.invalid).toBeTrue();

    triggerFormControl("password", "");
    expect(component.forgetForm.controls.password.invalid).toBeTrue();

    triggerFormControl("confirmPassword", "");
    expect(component.forgetForm.controls.confirmPassword.invalid).toBeTrue();

    triggerFormControl("password", "validpassword");
    triggerFormControl("confirmPassword", "validpassword2");
    expect(component.forgetForm.invalid).toBeTrue();
  });

  it('should send request and count down when send code', fakeAsync(() => {
    triggerFormControl("email", "test@test.com");
    const sendButtonDef:DebugElement = fixture.debugElement.query(By.css("mat-form-field button"));
    expect(sendButtonDef.nativeElement.disabled).toBeFalse();

    sendButtonDef.triggerEventHandler("click");
    fixture.detectChanges();
    expect(component.codeSendCount).toEqual(60);
    expect(userServiceMock.sendCodeToEmail).toHaveBeenCalled();
    expect(toastMock.push).toHaveBeenCalled();
    expect(sendButtonDef.nativeElement.disabled).toBeTrue();
    // 60秒禁用测试
    tick(2000)
    fixture.detectChanges();
    expect(component.codeSendCount).toEqual(58);
    expect(sendButtonDef.nativeElement.disabled).toBeTrue();
    expect(sendButtonDef.nativeElement.innerText).toEqual("58");
    tick(59000);
    fixture.detectChanges();
    expect(component.codeSendCount).toEqual(0);
    expect(sendButtonDef.nativeElement.disabled).toBeFalse();
    expect(sendButtonDef.nativeElement.innerText).toEqual("发送验证码");
  }));

  it('should send request, disable submit and show progress when send form', fakeAsync(() => {
    userServiceMock.resetByEmail.and.returnValue(of("success").pipe(delay(2000)));
    triggerFormControl("email", "test@test.com");
    triggerFormControl("code", "1234565");
    triggerFormControl("password", "123456789");
    triggerFormControl("confirmPassword", "123456789");

    const submitButtonDef:DebugElement = fixture.debugElement.query(By.css("[type=submit]"));
    component.submit();
    expect(submitButtonDef.nativeElement.disabled).toBeFalse();
    fixture.detectChanges();
    expect(component.showSubmitButton).toBeFalse();
    expect(userServiceMock.resetByEmail).toHaveBeenCalled();

    tick(3000);
    fixture.detectChanges();
    expect(toastMock.push).toHaveBeenCalledWith("重置成功", "success");
    expect(component.showSubmitButton).toBeTrue();
  }));
});
