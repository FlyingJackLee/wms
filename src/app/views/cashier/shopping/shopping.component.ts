import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Merchandise } from 'src/app/models/merchandise';
import { OrderConfirmComponent } from '../../components/order-confirm/order-confirm.component';
import {Event} from "@angular/router";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  selectedMerchandise: Merchandise | undefined;
  cart: Merchandise[] = [];

  constructor(public dialog:MatDialog){}

  updateList(merchandises:Merchandise) {
    this.selectedMerchandise = merchandises;
  }

  addToCart(item:Merchandise) {
    if(this.cart.indexOf(item) < 0) {
      this.cart.push(item);
      this.selectedMerchandise = undefined;
    }
  }

  removeFromCart(item:Merchandise) {
    this.cart = this.cart.filter(me => me != item);
  }

  clearCart() {
    this.cart = [];
  }

  changePrice(event: any, item: Merchandise) {
    item.price = Number((event.target as HTMLInputElement).value);
  }

  orderConfirm() {
    const dialogRef = this.dialog.open<OrderConfirmComponent>(OrderConfirmComponent, {
      data: {cart: this.cart},
      height: "500px",
      width: "350px"
    }).afterClosed().subscribe(
      result => {
        if (result.isSuccess) {
          location.reload(); //提交成功 刷新页面
        }
      });
  }
}
