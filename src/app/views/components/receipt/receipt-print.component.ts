import {Component, Input} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {NgxPrintDirective, NgxPrintService, PrintOptions} from "ngx-print";
import {Merchandise} from "../../../models/merchandise";
import {ChineseCapitalPipe} from "../../../pipes/ChineseCapital";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogTitle} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {GroupService} from "../../../services/group.service";
import {Order} from "../../../models/order";

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    ChineseCapitalPipe,
    NgxPrintDirective,
    MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
    AsyncPipe
  ],
  templateUrl: './receipt-print.component.html',
  styleUrl: './receipt-print.component.scss',
})
export class ReceiptPrintComponent{
  @Input() data: Order[] = [];

  today = new Date();
  constructor(private printService: NgxPrintService, public userService: UserService, public groupService: GroupService) {
  }

  total() {
    return this.data.reduce((pre, cur, idx, arr) => {
      return pre + cur.sellingPrice;
    }, 0)
  }

  print(){
    this.printService.styleSheetFile = "assets/css/receipt.css";
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'print-section'
    })

    this.printService.print(customPrintOptions)
  }
}
