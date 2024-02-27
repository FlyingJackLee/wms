import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Merchandise } from 'src/app/models/merchandise';
import { MerchandiseService } from 'src/app/services/merchandise.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {map, switchMap, take} from "rxjs";
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements AfterViewInit{
  count:number = 0;
  pageIndex:number = 0;
  pageSize:number = 10;

  displayedColumns: string[] = ['id', 'cate_name', 'imei','cost', 'price', 'create_date', 'edit'];
  dataSource: Merchandise[] = [];

  hideCost: boolean = true;

  constructor(private merchandiseService:MerchandiseService) {}

  ngAfterViewInit() {
    this._refreshData();
  }

  // pageChangePage($event:PageEvent) {
  //   this.pageIndex = $event.pageIndex;
  //   this.pageSize = $event.pageSize
  //   this._refreshData();
  // }

  select(category: Category) {
    console.log(category)
    this.merchandiseService.getMerchandisesByCateId(category.id).subscribe(
      data => {
          this.dataSource = data;
          this.count = data.length;
      }
  );
  }

  private _refreshData() {
    this.merchandiseService.getMerchandiseByPage(0, 999).subscribe(
        data => {
            this.count = data.count;
            this.dataSource = data.merchandise;
        }
    );
  }
}
