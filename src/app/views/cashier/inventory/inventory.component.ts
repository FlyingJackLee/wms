import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Merchandise } from 'src/app/models/merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';

import { Category } from 'src/app/models/category';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteMerchandiseComponent} from "./dialog-delete-merchandise/dialog-delete-merchandise.component";
import {DialogEditComponent} from "./dialog-edit-component/dialog-edit.component";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements AfterViewInit {
  count: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'cate_name', 'imei', 'cost', 'price', 'create_date', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Merchandise>();

  hideCost: boolean = true;

  constructor(private merchandiseService: MerchandiseService, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.merchandiseService.getMerchandiseByPage(0, 500).subscribe(
      data => {
        this.count = data.count;
        this.dataSource.data = data.merchandise;
      }
    );
    this.dataSource.paginator = this.paginator;
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
}
