import {DIALOG_DATA} from '@angular/cdk/dialog';
import {CommonModule} from '@angular/common';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Merchandise} from 'src/app/models/merchandise';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {OrderService} from "../../../../services/order.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {finalize} from "rxjs";
import {ToastService} from "../../../../services/toast.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../../models/order";
import {NgxPrintModule} from "ngx-print";
import {ReceiptPrintComponent} from "../../../components/receipt/receipt-print.component";

interface OrderConfirmForm {
  date: FormControl<Date>;
  remark: FormControl<string>;
}

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, NgxPrintModule,
    MatInputModule, MatIconModule, MatDividerModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule, ReceiptPrintComponent],
  providers:[

    ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit{
  totalSellingPrice: number = 0;
  today = new Date();
  loading:boolean = false; // 用于请求时控制允许提交

  @ViewChild("receipt") receipt!: ReceiptPrintComponent;

  orderConfirmForm:FormGroup<OrderConfirmForm> = this.formBuilder.nonNullable.group(
    {
      date: [this.today, Validators.required],
      remark: ['']
    });

  constructor(@Inject(DIALOG_DATA) public data: { cart: Merchandise[]},
              private dialogRef: MatDialogRef<OrderConfirmComponent>,
              private formBuilder: FormBuilder,
              private orderService:OrderService,
              private toast: ToastService) {}

  ngOnInit(): void {
    this.data.cart.forEach((item: Merchandise) => {
      this.totalSellingPrice += item.price;
    });
  }

  /**
   * 提交订单
   */
  order() {
    this.loading = true;
    if (this.orderConfirmForm.valid && this.data.cart.length > 0) {
       let orders: Order[] = [];

       this.data.cart.forEach(me => orders.push({
         id: -1,
         merchandise: me,
         sellingPrice: me.price,
         remark: this.orderConfirmForm.value.remark!,
         sellingTime: this.orderConfirmForm.value.date!,
         returned: false
       }));

       this.orderService.batchOrder(orders).pipe(
         finalize(() => this.loading = false)
       ).
       subscribe({
         complete: () => {
           this.toast.push("提交成功", "success");
           this.dialogRef.close({isSuccess: true});
           this.receipt.print();
         }
       });
    } else {
      this.loading = false;
    }
  }
}
