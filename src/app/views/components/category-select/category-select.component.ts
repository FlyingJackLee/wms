import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category';

import { CategoryService } from 'src/app/services/category.service'
import { MerchandiseService } from 'src/app/services/merchandise.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit{
  @Output() select = new EventEmitter<Category>();

  rootCategories!: Observable<Category[]>;
  modelCategories!: Observable<Category[]>;
  secondCategories!: Observable<Category[]>;

  selectedCategory!:Category;

  constructor(private categoryService:CategoryService ){}

  ngOnInit(): void {
    this.rootCategories = this.categoryService.getAllRootCategories()
  }

  rootSelect(category:Category) {
    // 清空二级
    this.secondCategories = new Subject();

    this.modelCategories = this.categoryService.getCategoriesByParentId(category.id);

    this.selectCategory(category)
  }

  modelSelect(category:Category) {
    this.secondCategories = this.categoryService.getCategoriesByParentId(category.id);

    this.selectCategory(category)
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.select.emit(this.selectedCategory);
  }
}
