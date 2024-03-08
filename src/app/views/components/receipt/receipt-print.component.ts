import {Component, Input} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgxPrintDirective, NgxPrintService, PrintOptions} from "ngx-print";
import {Merchandise} from "../../../models/merchandise";
import {ChineseCapitalPipe} from "../../../pipes/ChineseCapital";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogTitle} from "@angular/material/dialog";

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
    MatDialogActions
  ],
  templateUrl: './receipt-print.component.html',
  styleUrl: './receipt-print.component.scss',
})
export class ReceiptPrintComponent{
  @Input() data: Merchandise[] = [];

  today = new Date();
  constructor(private printService: NgxPrintService) {
  }

  total() {
    return this.data.reduce((pre, cur, idx, arr) => {
      return pre + cur.price;
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
