import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Merchandise } from 'src/app/models/merchandise';

import { CategoryService } from 'src/app/services/category.service'
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit{
    @Input() pageIndex:number = 0;
    @Input() pageSize:number = 50;

    @Output() results = new EventEmitter<Observable<Merchandise[]>>();
    @Output() total = new EventEmitter<number>();

    rootCategories!: Observable<Category[]>;
    modelCategories!: Observable<Category[]>;
    secondCategories!: Observable<Category[]>;

    selectedCategory!:Category;

    constructor(private merchanService:MerchandiseService,
      private categoryService:CategoryService ){}

    ngOnInit(): void {
      this.rootCategories = this.categoryService.getAllRootCategories()
    }

    rootSelect(category:Category) {
      // 清空二级
      this.secondCategories = new Subject();

      this.selectedCategory = category;    
      this.modelCategories = this.categoryService.getCategoriesByParentId(category.cate_id);

      this.selectAndSendToParent(category);
    }  

    modelSelect(category:Category) {
      this.selectedCategory = category;    
      this.secondCategories = this.categoryService.getCategoriesByParentId(category.cate_id);

      this.selectAndSendToParent(category);
    }

    selectAndSendToParent(category:Category){
      this.selectedCategory = category;

      this.results.emit(
        this.merchanService.getMerchandisesByCateId(this.selectedCategory.cate_id, 1, this.pageSize)
        );
          
    }
    
}
