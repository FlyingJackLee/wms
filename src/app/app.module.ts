import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CategorySelectComponent } from './views/components/category-select/category-select.component';
import { ShoppingComponent } from './views/shopping/shopping.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule} from '@angular/material/card';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { SearchComponent } from './views/components/search/search.component';
import { ToastComponent }  from 'src/app/views/components/toast/toast.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInteceptor } from './inteceptors/api-inteceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInteceptor, multi: true},
    { provide: MAT_DATE_FORMATS, useValue: WMS_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-Hans' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
