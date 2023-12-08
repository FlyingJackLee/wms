import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingComponent } from "./views/shopping/shopping.component"
import { InventoryComponent } from "./views/inventory/inventory.component"
import { StatisticsComponent } from "./views/statistics/statistics.component"
import { PageNotFoundComponent } from "./views/page-not-found/page-not-found.component"


const routes: Routes = [
  { path: "shopping", component: ShoppingComponent},
  { path: "inventory", component: InventoryComponent},
  { path: "statistics", component: StatisticsComponent},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
