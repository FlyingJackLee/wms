import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../models/merchandise';
import { Observable } from 'rxjs';

type MerchandisesQuery = 
{
  count:number;
  merchandises:Merchandise[];
}

@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
  url = "http://localhost:3000/merchandises"

  constructor(private http:HttpClient) { }
  
  // 未防止数量太多，请使用分页
  // page: 分页页码
  // limit: 每页数量 
  getMerchandisesByCateId(cate_id:number, page:number, limit:number):Observable<Merchandise[]> {
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("cate_id", cate_id);
    queryParames =  queryParames.append("_page", page);
    queryParames =  queryParames.append("_limit", limit);

    return this.http.get<Merchandise[]>(this.url, {params: queryParames});
  }


  searchMerchandies(text: string, page:number, limit:number): Observable<Merchandise[]> {
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("q", text);
    queryParames =  queryParames.append("_page", page);
    queryParames =  queryParames.append("_limit", limit);
    return this.http.get<Merchandise[]>(this.url, {params: queryParames});
  }

}
