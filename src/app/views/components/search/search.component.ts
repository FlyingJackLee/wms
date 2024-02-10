import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Merchandise } from 'src/app/models/merchandise';
import { MerchandiseService } from "src/app/services/merchandise.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() pageIndex:number = 0;
  @Input() pageSize:number = 50;

  @Output() results = new EventEmitter<Observable<Merchandise[]>>();

  searchText!: string;
  constructor(private matdialog: MatDialog, private service: MerchandiseService){}

  search() {
    if(!this.searchText || !(this.searchText.trim())){
        this.matdialog.open(EmptyDialogComponent, {
      });
    }
    else {
      this.results.emit(this.service.searchMerchandies(this.searchText, this.pageIndex, this.pageSize));
    }
  }

  // 清除搜索框
  clear() {
    this.searchText = "";
  }
}

@Component({
  selector: 'empty-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>错误</h1>
    <div mat-dialog-content>
      必须输入一个值用于搜索
      <div></div>
      <button mat-button color="warn" mat-dialog-close cdkFocusInitial>好的</button>
    </div>
  `,
  imports: [MatDialogModule, MatButtonModule],

})
export class EmptyDialogComponent {
  constructor(public dialogRef: MatDialogRef<EmptyDialogComponent>) {}
}