import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { ShoppingComponent } from "./views/cashier/shopping/shopping.component"
import { InventoryComponent } from "./views/cashier/inventory/inventory.component"
import { StatisticsComponent } from "./views/cashier/statistics/statistics.component"
import { PageNotFoundComponent } from "./views/page-not-found/page-not-found.component"
import { LoginComponent } from './views/user/login/login.component';
import { UserComponent } from './views/user/user/user.component';
import { CashierComponent } from './views/cashier/cashier/cashier.component';
import { AuthService } from './services/auth.service';
import {ForgetComponent} from "./views/user/forget/forget.component";
import {SignupComponent} from "./views/user/signup/signup.component";

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  return inject(AuthService).isAuthenticated() ? true : inject(Router).navigate(["/user/login"]);
};

const routes: Routes = [
  {
    path: "user", component: UserComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "forget", component: ForgetComponent }
    ]
  },
  {
    path: "cashier", component: CashierComponent, canActivate: [authGuard],
    children: [
      { path: "shopping", component: ShoppingComponent},
      { path: "inventory", component: InventoryComponent},
      { path: "statistics", component: StatisticsComponent },
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


