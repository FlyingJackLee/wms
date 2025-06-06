import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {NgxPrintDirective, NgxPrintService, PrintOptions} from "ngx-print";
import {ChineseCapitalPipe} from "../../../pipes/ChineseCapital";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogTitle} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {GroupService} from "../../../services/group.service";
import {Order} from "../../../models/order";
import { CategoryService } from 'src/app/services/category.service';
import { UserProfile } from 'src/app/models/profile';
import { Group } from 'src/app/models/group';
import {} from 'src/app/models/group';
import { CustomerDetail } from 'src/app/models/customer';

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
export class ReceiptPrintComponent implements OnInit{
  @Input() data: Order[] = [];
  @Input() customerDetail: CustomerDetail = {
    name: "",
    phone: "",
    address: ""
  };

  userprofile: UserProfile  = {
      userId: 0,
      nickname: "",
      email: "",
      phoneNumber: "",
      avatar: "default"
  }

  group: Group = {
    id: -1,
    storeName: "默认",
    address: "默认地址",
    contact: "默认联系方式",
    createTime: new Date()
  };

  models: String[] = [];

  today = new Date();
  constructor(private printService: NgxPrintService, public userService: UserService, public groupService: GroupService, public categorService: CategoryService) {
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

  ngOnInit(): void {
      this.userService.getProfile().subscribe(profile => {
        this.userprofile = profile;
      });

      this.groupService.getGroup().subscribe(g => {
        this.group = g;
      });

      for (let i = 0; i < this.data.length; i++) {
        this.categorService.getCategoryDetailById(this.data[i].merchandise.category.parentId).subscribe(c => {
            this.models.push(c.name);
        });
      }
  }
}
