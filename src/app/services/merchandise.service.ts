import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../models/merchandise';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type MerchandisePage =
{
  count: number;
  merchandise: Merchandise[];
}

export type MerchandiseCacheKey = {
  page:number;
  limit:number;
}

@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
  url = "http://localhost:3000/merchandises"

  constructor(private http:HttpClient) { }

  getMerchandiseByPage(page:number, limit:number): Observable<MerchandisePage> {
    let queryParams = new HttpParams();
    queryParams =  queryParams.append("offset", page * limit);
    queryParams =  queryParams.append("limit", limit);
    return this.http.get<MerchandisePage>("merchandise/", { params: queryParams });
  }

  getMerchandisesByCateId(cate_id:number):Observable<Merchandise[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cate_id", cate_id);

    return this.http.get<Merchandise[]>("merchandise/cate", {params: queryParams});
  }

  searchMerchandies(text: string, page:number, limit:number): Observable<MerchandisePage> {
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("q", text);
    queryParames =  queryParames.append("_page", page);
    queryParames =  queryParames.append("_limit", limit);
    return this.http.get<MerchandisePage>(this.url, {params: queryParames});
  }
}
