import {AfterViewInit, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Merchandise} from 'src/app/models/merchandise';
import {OrderConfirmComponent} from './order-confirm/order-confirm.component';
import {DriveStep} from "driver.js";
import {IntroService} from "../../../services/intro.service";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements AfterViewInit{
  selectedMerchandise: Merchandise | undefined;
  cart: Merchandise[] = [];

  constructor(public dialog:MatDialog, private introService: IntroService){}

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

  ngAfterViewInit(): void {
    //生成初始引导
    if (!this.introService.checkGuided("shopping")){

    const tourMe = {
      id: -1,
      category: {
        id: -1,
        parentId: -1,
        name: "演示用"
      },
      cost: 999,
      price: 9999,
      imei: "123456",
      sold: false,
      createTime: new Date()
    };

    this.selectedMerchandise = tourMe;
    this.cart.push(tourMe);
    const steps:DriveStep[] = [
        { popover:{ title:"收银功能", description:"接下来介绍收银功能", side:"right", align:"start" } },
        { element:"app-search .search-field", popover:{ title:"查找商品(1/2)", description:"首先在这里输入型号或者扫码枪输入串号", side:"right", align:"start" } },
        { element:"app-search button", popover:{ title:"查找商品(2/2)", description:"点击这里搜索", side:"right", align:"start" } },
        { element:".list-area mat-card-actions button", popover:{ title:"添加结账商品", description:"点击结账添加进购物车", side:"right", align:"start" } },
        { element:".receipt-card", popover:{ title:"购物车", description:"这里会展示购物车的上商品", side:"right", align:"start" } },
        { element:"#price", popover:{ title:"实际价格", description:"这里修改实际销售价格", side:"right", align:"start" } },
        { element:".receipt-footer button", popover:{ title:"提交", description:"点击提交即可", side:"right", align:"start" } },
    ];

      this.introService.create(steps);
      this.introService.setGuided("shopping")
    }
  }
}
