import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MeCount, Merchandise} from "../../../../models/merchandise";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-mechandise-account',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatTableModule
  ],
  templateUrl: './merchandise-account.component.html',
  styleUrl: './merchandise-account.component.scss'
})
export class MerchandiseAccountComponent {
  displayedColumns: string[] = ['model', 'count' ,'cost', 'price'];
  dataSource: MeCount[] = this.data;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MeCount[]) {
  }

  getTotalCount() {
    return this.data.map(t => t.count).reduce((acc, value) => acc + value, 0);
  }
  getTotalCost() {
    return this.data.map(t => t.sumCost).reduce((acc, value) => acc + value, 0);
  }
  getTotalPrice() {
    return this.data.map(t => t.sumPrice).reduce((acc, value) => acc + value, 0);
  }
}
