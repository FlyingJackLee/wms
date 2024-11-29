import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MeCount, Merchandise} from '../models/merchandise';
import {Observable} from 'rxjs';
import {ApiRes} from "../models/ApiRes";

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
  constructor(private http:HttpClient) { }

  getMerchandiseByPage(page:number, limit:number): Observable<MerchandisePage> {
    let queryParams = new HttpParams();
    queryParams =  queryParams.append("offset", page * limit);
    queryParams =  queryParams.append("limit", limit);
    return this.http.get<MerchandisePage>("merchandise/", { params: queryParams });
  }

  getMerchandisesByCateId(cateId:number):Observable<Merchandise[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cate_id", cateId);

    return this.http.get<Merchandise[]>("merchandise/cate", {params: queryParams});
  }

  updateMerchandise(cateId:number, cost: number, price: number, imei:string){
    let queryParams = new HttpParams().set("cost", cost).set("price", price).set("imei", imei);
    return this.http.put<ApiRes>("merchandise/" + cateId , null,{params: queryParams});
  }

  insertMerchandiseSet(cateId:number, cost: number, price: number, createTime: Date, imeiSet: Set<string>){
    let queryParams = new HttpParams().set("cate_id", cateId)
      .set("cost", cost).set("price", price).set("create_time", createTime.getTime())
    imeiSet.forEach(imei => queryParams = queryParams.append("imei_list", imei));

    return this.http.post<Merchandise[]>("merchandise/", null,{params: queryParams});
  }

  deleteMerchandise(me_id:number){
    return this.http.delete<ApiRes>("merchandise/" + me_id);
  }

  searchMerchandise(text: string): Observable<Merchandise[]> {
    let queryParams = new HttpParams().set("text", text);
    return this.http.get<Merchandise[]>("merchandise/search", {params: queryParams});
  }

  /**
   * 盘库统计
   */
  account(): Observable<MeCount[]> {
    return this.http.get<MeCount[]>("merchandise/account");
  }
}
