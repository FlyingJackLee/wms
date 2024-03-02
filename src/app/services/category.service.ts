import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import {Observable, catchError, throwError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }

  getAllRootCategories(): Observable<Category[]>{
    return this.getCategoriesByParentId(0);
  }

  getCategoriesByParentId(parentId: number): Observable<Category[]>{
    if (parentId < 0) {
      return of([]);
    }
    return this.http.get<Category[]>("category/parent/" + parentId);
  }

  getCategoryDetailById(cateId: number): Observable<Category> {
    return this.http.get<Category>("category/" + cateId);
  }

  insertCategory(parentId: number, name: string) {
    let queryParas = new HttpParams().set("parentId", parentId).set("name", name);
    return this.http.post("category/", null, {params: queryParas});
  }

  deleteCategory(cateId: number) {
    return this.http.delete<String>("category/" + cateId);
  }
}
