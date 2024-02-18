import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ToastComponent } from '../../components/toast/toast.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-cashier',
  standalone: true,
  imports: [RouterModule, ToastComponent, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.scss'
})
export class CashierComponent {
  isExpanded = true;
}
