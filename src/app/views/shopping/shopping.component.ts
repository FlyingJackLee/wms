import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Merchandise } from 'src/app/models/merchandise';
import { CategoryService } from 'src/app/services/category.service';
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  pageSize = 10;
  pageIndex = 0;
  pageLength = 0;

  merchandises!: Observable<Merchandise[]>;
  test!:Observable<Category>;

  constructor(private service:MerchandiseService, 
    private cateService:CategoryService)
  {}


  updateList(merchandises:Observable<Merchandise[]>) {
    this.merchandises = merchandises.pipe(
      tap(mes => {
        // 更新步进长度
        this.pageLength = mes.length;
      })
    );
    }

}


