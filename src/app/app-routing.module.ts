import {inject, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';

import {ShoppingComponent} from "./views/cashier/shopping/shopping.component"
import {InventoryComponent} from "./views/cashier/inventory/inventory.component"
import {StatisticsComponent} from "./views/cashier/statistics/statistics.component"
import {LoginComponent} from './views/user/login/login.component';
import {UserComponent} from './views/user/user/user.component';
import {CashierComponent} from './views/cashier/cashier/cashier.component';
import {AuthService} from './services/auth.service';
import {EmailForgetComponent} from "./views/user/forget/mail/email-forget.component";
import {SignupComponent} from "./views/user/signup/signup.component";
import {CashierHomeComponent} from "./views/cashier/home/cashier-home.component";
import {PersonalCenterComponent} from "./views/cashier/personal-center/personal-center.component";
import {ProfileComponent} from "./views/cashier/personal-center/profile/profile.component";
import {StoreManageComponent} from "./views/cashier/personal-center/store-manage/store-manage.component";
import {MemberComponent} from "./views/cashier/personal-center/member/member.component";
import {StaffManageComponent} from "./views/cashier/personal-center/staff-manage/staff-manage.component";
import {Permission, Role} from "./models/authority";
import {UserService} from "./services/user.service";
import {ToastService} from "./services/toast.service";
import {PhoneForgetComponent} from "./views/user/forget/phone/phone-forget.component";

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  return inject(AuthService).isAuthenticated() ? true : inject(Router).navigate(["/user/login"]);
};

export const permissionGuard = (permissionCheck: Permission):CanActivateFn => {
  return (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      {
        let isPass = false;

        // 先检查role
        inject(UserService).getRole().subscribe(data => {
          if (data == Role.OWNER) isPass = true
        });

        // 再检查permission
        inject(UserService).getPermissions().subscribe(data => {
          for (const item of data) {
            if(item.authority == permissionCheck) {
              isPass = true;
              break;
            }
          }
        });

        if (!isPass) {
          inject(ToastService).push("权限不足", "warning");
        }

        return isPass ? true : inject(Router).navigate(["/cashier/center/store"]);
      };
}

const routes: Routes = [
  {
    path: "user", component: UserComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "forget/email", component: EmailForgetComponent },
      { path: "forget/phone", component: PhoneForgetComponent },
    ]
  },
  {
    path: "cashier", component: CashierComponent, canActivate: [authGuard],
    children: [
      { path: "home", component: CashierHomeComponent },
      { path: "shopping", component: ShoppingComponent, canActivate: [permissionGuard(Permission.SHOPPING)]},
      { path: "inventory", component: InventoryComponent, canActivate: [permissionGuard(Permission.INVENTORY)]},
      { path: "statistics", component: StatisticsComponent, canActivate: [permissionGuard(Permission.STATISTICS)] },
      { path: "center", component: PersonalCenterComponent,
        children: [
          { path: "profile", component: ProfileComponent },
          { path: "store", component: StoreManageComponent },
          { path: "member", component: MemberComponent },
          { path: "staff", component: StaffManageComponent }
        ]},
    ]
  },
  { path: "**", redirectTo: '/cashier' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }


