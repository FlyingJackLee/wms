import {Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../models/order";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {OrderService} from "../../../services/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DialogReturnConfirmComponent} from "./dialog-return-confirm/dialog-return-confirm.component";
import {Merchandise} from "../../../models/merchandise";
import {MatButtonModule} from "@angular/material/button";
import {ReceiptPrintComponent} from "../../components/receipt/receipt-print.component";
import {utils, writeFileXLSX} from "xlsx";

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
  displayedColumns: string[] = ['id', 'cate_name', 'imei', 'cost', 'selling_price', 'selling_time', 'remark', 'returned', "reprint"];
  dataSource = new MatTableDataSource<Order>();
  containReturned: boolean = true;
  hideCost: boolean = true;

  form = new FormGroup<DateRangeForm>({
    start: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0), {
      nonNullable: true,
      validators: Validators.required
    }),
    end: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59), {
      nonNullable: true,
      validators: Validators.required
    }),
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService, public dialog: MatDialog) {
  }

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

  print(order: Order){
    if (order && order.merchandise){
      console.log(order)
      this.dialog.open(DialogPrintConfirmComponent,{
        width: '160px',
        height: '120px',
        data: order
      })
    }
  }

  saveToExcel() {
    const wb = utils.book_new();
    // 设置表头
    const heading = [["序号", "型号", "串号", "成本", "实际售价", "是否退货" , "录入时间", "备注"]];

    // map去除不需要的列
    let data = this.dataSource.filteredData.map(item => {
      return {
        id: item.id,
        cate: item.merchandise.category.name,
        imei: item.merchandise.imei,
        cost: item.merchandise.cost,
        sellingPrice: item.sellingPrice,
        returned: item.returned ? "已退货" : "",
        time: item.sellingTime,
        remark: item.remark,
      }
    })

    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, heading)
    utils.sheet_add_json(ws, data, {origin: 'A2', skipHeader: true});
    delete (ws['06'])

    // 设置单元格间距
    var wscols = [
      {wch:6},
      {wch:10},
      {wch:30},
      {wch:10},
      {wch:10},
      {wch:20},
      {wch:50},
      {wch:50},
    ];
    ws['!cols'] = wscols;

    utils.book_append_sheet(wb, ws, "Sheet1");
    const fileName = "销售情况" + "_" +  new Date().getFullYear() +
      "_" +  (new Date().getMonth() + 1) +
      "_" +  new Date().getDay() + ".xlsx";
    writeFileXLSX(wb, fileName);
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>确定打印？</h1>
    <mat-dialog-actions>
        <button mat-button mat-dialog-close >取消</button>
        <button mat-raised-button color="primary" mat-dialog-close (click)="confirm()">确认</button>
    </mat-dialog-actions>
    <app-receipt [data]="[data]" #receipt></app-receipt>
  `,
  selector: 'diaglo-print-confirm',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReceiptPrintComponent
  ],
  standalone: true
})
class DialogPrintConfirmComponent{
  @ViewChild('receipt') receipt!:ReceiptPrintComponent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order,
              private dialogRef: MatDialogRef<DialogPrintConfirmComponent>) {
  }

  confirm(){
    this.receipt.print();
  }
}
