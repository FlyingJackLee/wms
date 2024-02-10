import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject, map} from 'rxjs';
import { Merchandise } from 'src/app/models/merchandise';
import { MerchandiseService, MerchandisesQuery } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  PAGE_SIZE = 10;

  count:number = 0;
  dataSource = new MatTableDataSource<Merchandise>();

  displayedColumns: string[] = ['me_id', 'cate_name', 
        'cost', 'or_price', 'create_date', 'edit'];
  constructor(private merchandiseService:MerchandiseService) {}

  ngOnInit(): void {
    this._refreshData(0, this.PAGE_SIZE)
  }

  changePage($event:PageEvent) {
    this._refreshData($event.pageIndex, $event.pageSize)
  }

  private _refreshData(pageIndex:number, pageSize:number) {
    this.merchandiseService.getAllMerchandies(pageIndex, pageSize).subscribe(item => {
      this.count = item.count;
      this.dataSource.data = item.merchandises;
    });
  }

}
