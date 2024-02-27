import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:3000/categories"

  constructor(private http:HttpClient) { }

  getAllRootCategories(): Observable<Category[]>{
    return this.getCategoriesByParentId(0);
  }

  getCategoriesByParentId(parent_id: number): Observable<Category[]>{
    return this.http.get<Category[]>("category/parent/" + parent_id);
  }

  getCategoryDetailById(cate_id: number): Observable<Category> {
    return this.http.get<Category>("category/" + cate_id);
  }
}
