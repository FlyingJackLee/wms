import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../models/order";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../services/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {
  DialogDeleteMerchandiseComponent
} from "../inventory/dialog-delete-merchandise/dialog-delete-merchandise.component";
import {DialogReturnConfirmComponent} from "./dialog-return-confirm/dialog-return-confirm.component";

interface DateRangeForm {
  start: FormControl<Date>;
  end: FormControl<Date>;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  displayedColumns: string[] = ['id', 'cate_name', 'imei' ,'cost', 'selling_price', 'selling_time', 'remark' , 'returned'];
  dataSource = new MatTableDataSource<Order>();
  containReturned: boolean = true;
  hideCost: boolean = true;

  form = new FormGroup<DateRangeForm>({
    start: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0), { nonNullable: true, validators: Validators.required}),
    end: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59), { nonNullable: true, validators: Validators.required}),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService:OrderService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this._refreshData();
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      return (this.containReturned ? true : !data.returned) &&
        ( data.merchandise.category.name.toLowerCase().includes(filter.trim())
          || data.merchandise.imei.toLowerCase().includes(filter.trim()));
    };

  }


  applyFilter(event: Event | MatCheckboxChange) {
    if (event instanceof MatCheckboxChange) {
      this.dataSource.filter = this.dataSource.filter + " " ; //通过添加空格，使filter变化触发filter predicate事件
    } else {
      this.dataSource.filter = (event.target as HTMLInputElement).value.toLowerCase() + " "; //通过添加空格，保证全删除时也会筛选containReturned条件
    }
  }

  total(mode: string) {
    let result;
    switch (mode) {
      case 'cost' :
        result = this.dataSource.filteredData.reduce((prev, cur, index, arr) =>
            prev + (cur.returned ? 0 : cur.merchandise.cost), 0);
        break;
      case 'price' : result = this.dataSource.filteredData.reduce((prev, cur, index, arr) =>
        prev +(cur.returned ? 0 : cur.sellingPrice), 0);
      break;
      case 'income' : result = this.dataSource.filteredData.reduce((prev, cur, index, arr) =>
        prev + (cur.returned ? 0 : (cur.sellingPrice - cur.merchandise.cost) ), 0);
      break;
      default:
    }
    return result;
  }

  returning(order:Order) {
    this.dialog.open(DialogReturnConfirmComponent,{
      width: '300px',
      height: '190px',
      data: order
    }).afterClosed().subscribe(result =>
      {
        // 删除结束后刷新
        if (result.isSuccess){
          order.returned = true;
        }
      }
    );
  }

  _refreshData() {
    this.orderService.getOrdersByDateRange(this.form.value.start!, this.form.value.end!).subscribe(
      orders => {
        this.dataSource.data = orders;
      }
    );
  }
}
