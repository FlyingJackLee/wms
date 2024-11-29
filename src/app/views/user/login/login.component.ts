import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from "@angular/material/divider";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {finalize} from "rxjs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {PreventEnterDirective} from "../../../directives/prevent-enter.directive";

interface LoginForm {
  phone?: FormControl<string>;
  email?: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDividerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressBarModule, PreventEnterDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  hidePassword = true;
  activatePrincipal: 'phone' | 'email' = 'phone';

  showSubmitButton = true;

  principals: { phone: FormControl<string>, email:FormControl<string>} = {
    'phone': new FormControl("", {nonNullable: true, validators:[Validators.required, Validators.pattern("^1[3-9]\\d{9}$")]}),
    'email': new FormControl("", {nonNullable: true, validators:[Validators.required, Validators.email]})
  }

  loginForm = new FormGroup<LoginForm>({
    phone: this.principals['phone'],
    password: new FormControl('', { nonNullable:true , validators: [Validators.required, Validators.pattern('^\\S{8,16}$')]}),
  });

  constructor(private userService:UserService, private authService:AuthService, private router:Router) {
  }

  switchPrincipalField(){
    // 删除数据，移除control
    this.loginForm.controls[this.activatePrincipal]?.reset();
    this.loginForm.removeControl(this.activatePrincipal);

    // 切换
    this.activatePrincipal = this.activatePrincipal == 'phone' ? 'email' : 'phone';
    this.loginForm.addControl(this.activatePrincipal, this.principals[this.activatePrincipal]);
  }

  submit(){
    // 请求前禁用button 防止重复提交
    this.showSubmitButton = false;

    // 手机号登陆
    if (this.activatePrincipal == 'phone') {
      this.userService.loginByPhone(this.loginForm.value.phone!, this.loginForm.value.password!)
        .pipe(
          finalize(() => this.showSubmitButton = true ) // 请求完成后重新显示button
        )
        .subscribe(data =>  {
          this.authService.setToken(data.token);
          this.router.navigate(["cashier"]);
        });
    }
    else if (this.activatePrincipal == 'email') {
      // 邮件登陆
      this.userService.loginByEmail(this.loginForm.value.email!, this.loginForm.value.password!)
        .pipe(
          finalize(() => this.showSubmitButton = true ) // 请求完成后重新显示button
        )
        .subscribe(data => {
          this.authService.setToken(data.token);
          this.router.navigate(["cashier"]);
        });
    }
    else {
      this.showSubmitButton = true;
    }
  }
}
