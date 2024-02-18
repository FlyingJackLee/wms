import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Merchandise } from 'src/app/models/merchandise';
import { OrderConfirmComponent } from '../../components/order-confirm/order-confirm.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  pageSize = 20;
  pageIndex = 0;
  pageLength = 0;

  merchandises!: Observable<Merchandise[]>;

  cart: Map<Merchandise, number> = new Map();

  constructor(public dialog:MatDialog){}

  updateList(merchandises:Observable<Merchandise[]>) {
    this.merchandises = merchandises.pipe(
      tap(mes => {
        // TODO: 更新步进长度应该由后台传回专门的参数
        this.pageLength = mes.length;
      })
    );
    }

  addToCart(item:Merchandise) {
    if(!this.cart.has(item)) {
      this.cart.set(item, item.price);
    }
  }

  removeFromCart(item:Merchandise) {
    this.cart.delete(item);
  }

  clearCart() {
    this.cart = new Map();
  }

  orderConfrim() {
    const dialogRef = this.dialog.open<OrderConfirmComponent>(OrderConfirmComponent, {
      data: {cart: this.cart},
      height: "600px",
      width: "350px"
    })
  }

}
