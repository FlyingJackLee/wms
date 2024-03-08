import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Merchandise} from 'src/app/models/merchandise';
import {MerchandiseService} from 'src/app/services/merchandise.service';

import {Category} from 'src/app/models/category';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteMerchandiseComponent} from "./dialog-delete-merchandise/dialog-delete-merchandise.component";
import {DialogEditComponent} from "./dialog-edit-component/dialog-edit.component";
import {utils, writeFileXLSX} from 'xlsx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  count: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'cate_name', 'imei', 'cost', 'price', 'create_date', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Merchandise>();

  hideCost: boolean = true;

  constructor(private merchandiseService: MerchandiseService, public dialog: MatDialog) {
  }

  ngOnInit () {
    this.merchandiseService.getMerchandiseByPage(0, 500).subscribe(
      data => {
        this.count = data.count;
        this.dataSource.data = data.merchandise;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: Merchandise, filter: string) => {
      return( data.category.name.toLowerCase().includes(filter.trim())
        || data.imei.toLowerCase().includes(filter.trim()))
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // pageChangePage($event:PageEvent) {
  //   this.pageIndex = $event.pageIndex;
  //   this.pageSize = $event.pageSize
  //   this._refreshData();
  // }

  select(category: Category) {
    this.merchandiseService.getMerchandisesByCateId(category.id).subscribe(
      data => {
        this.dataSource.data = data;
        this.count = data.length;
      }
    );
  }

  openDeleteDialog(me: Merchandise) {
    this.dialog.open(DialogDeleteMerchandiseComponent, {
      width: '300px',
      height: '300px',
      data: me
    }).afterClosed().subscribe(result => {
        // 删除结束后刷新
        if (result.data) {
          this.select(result.data.category);
        }
      }
    );
  }

  openEditDialog(me: Merchandise) {
    this.dialog.open(DialogEditComponent, {
      width: '350px',
      height: '420px',
      data: me
    }).afterClosed().subscribe(result => {
        // 修改后刷新
        if (result.data) {
          this.select(result.data.category);
        }
      }
    );
  }

  total(mode: string) {
    let result;
    switch (mode) {
      case 'cost' :
        result = this.dataSource.filteredData.reduce((prev, cur, index, arr) =>
          prev + cur.cost, 0);
        break;
      case 'price' : result = this.dataSource.filteredData.reduce((prev, cur, index, arr) =>
        prev + cur.price, 0);
        break;
      default:
    }
    return result;
  }

  saveToExcel() {
    const wb = utils.book_new();
    // 设置表头
    const heading = [["序号", "型号", "成本", "售价", "串号", "录入时间"]];

    // map去除不需要的列
    let data = this.dataSource.filteredData.map(item => {
      return {
        id: item.id,
        cate: item.category.name,
        cost: item.cost,
        price: item.price,
        imei: item.imei,
        createTime: item.createTime
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
      {wch:10},
      {wch:10},
      {wch:30},
      {wch:50},
    ];
    ws['!cols'] = wscols;

    utils.book_append_sheet(wb, ws, "Sheet1");
    const fileName = "库存情况" + "_" +  new Date().getFullYear() +
                            "_" +  (new Date().getMonth() + 1) +
                             "_" +  new Date().getDay() + ".xlsx";
      writeFileXLSX(wb, fileName);
  }
}
