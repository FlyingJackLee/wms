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
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("parent_cate_id", 0);
    return this.http.get<Category[]>(this.url, {params: queryParames});
  }

  getCategoriesByParentId(parent_id: number): Observable<Category[]>{
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("parent_cate_id", parent_id);
    return this.http.get<Category[]>(this.url, {params: queryParames});
  }

  getCategoryDetailById(cate_id: number): Observable<Category> {
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("cate_id", cate_id);
    return this.http.get<Category>(this.url, {params: queryParames});
  }
}
