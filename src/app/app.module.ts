import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategorySelectComponent} from './views/components/category-select/category-select.component';
import {ShoppingComponent} from './views/cashier/shopping/shopping.component';
import {InventoryComponent} from './views/cashier/inventory/inventory.component';
import {StatisticsComponent} from './views/cashier/statistics/statistics.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {SearchComponent} from './views/components/search/search.component';
import {ToastComponent} from 'src/app/views/components/toast/toast.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';

import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService, getJWTToken} from './services/auth.service';
import {APIInterceptor} from './interceptors/api-interceptor';
import {ToastService} from "./services/toast.service";
import {CashierComponent} from "./views/cashier/cashier/cashier.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {CategoryManageComponent} from "./views/components/category-manage/category-manage.component";
import {CreateMerchandiseComponent} from "./views/cashier/inventory/create-merchandise/create-merchandise.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReceiptPrintComponent} from "./views/components/receipt/receipt-print.component";
import {ChineseCapitalPipe} from "./pipes/ChineseCapital";

const WMS_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY/MM/DD', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'YYYY/MM/DD', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectComponent,
    ShoppingComponent,
    InventoryComponent,
    StatisticsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJWTToken,
        // TODO 正式环境需要添加domain
        allowedDomains: ["127.0.0.1:8080, localhost:8080"],
        disallowedRoutes: ["//user/**"],
        skipWhenExpired: true
      }
    }),
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ToastComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    CashierComponent,
    MatTabsModule,
    CategoryManageComponent,
    CreateMerchandiseComponent,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    ReceiptPrintComponent,
    ChineseCapitalPipe
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: WMS_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-Hans' },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true, deps: [ToastService, AuthService, Router]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
