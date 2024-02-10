import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Merchandise } from 'src/app/models/merchandise';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatDividerModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule],
  providers:[

    ],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent implements OnInit{
  totalOringinalPrice: number = 0;
  totalSellingPrice: number = 0; 

  today = new Date();

  orderConfirmForm = this.formBuilder.group(
    {
      sellingDate: [this.today, Validators.required],
      sellingRemark: ['']
    });

  constructor(@Inject(DIALOG_DATA) public data: { cart: Map<Merchandise, number>}, private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.data.cart.forEach((value: number, key: Merchandise) => {
      this.totalOringinalPrice += Number(key.or_price);
      this.totalSellingPrice += Number(value);
    });
  }

  order() {
    console.warn(this.orderConfirmForm.value);
  }
}
