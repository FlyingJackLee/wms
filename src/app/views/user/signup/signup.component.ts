import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Router, RouterModule} from "@angular/router";
import {PrincipalType} from "../../../services/user.service";
import {EmailUniqueValidator, PhoneUniqueValidator} from "./signup.validators";
import {PreventEnterDirective} from "../../../directives/prevent-enter.directive";
import {BaseSignupComponent} from "./base-signup/base-signup.component";
import {NgComponentOutlet} from "@angular/common";

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
    ReactiveFormsModule,
    PreventEnterDirective,
    BaseSignupComponent,
    NgComponentOutlet
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent{
  phoneFieldControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern("^1[3-9]\\d{9}$")],
    asyncValidators: [ this.phoneUniqueValidator.validate.bind(this.phoneUniqueValidator) ],
    updateOn: "blur"
  });

  emailFieldControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
    asyncValidators: [ this.emailUniqueValidator.validate.bind(this.emailUniqueValidator) ],
    updateOn: "blur"
  });

  components = [
    {
      component: BaseSignupComponent,
      inputs: { principalTitle: "手机号", principal: this.phoneFieldControl, principalType: PrincipalType.PHONE  }
    },
    {
      component: BaseSignupComponent,
      inputs: { principalTitle: "邮箱", principal: this.emailFieldControl, principalType: PrincipalType.EMAIL  }
    },
  ];
  currentIndex = 0;

  constructor(public router: Router,
              private phoneUniqueValidator:PhoneUniqueValidator,
              private emailUniqueValidator:EmailUniqueValidator
  ) {
  }

  /**
   * 切换注册方式
   */
  switchPrincipalField() {
    this.currentIndex == 0 ? this.currentIndex = 1 : this.currentIndex = 0;
  }
}
