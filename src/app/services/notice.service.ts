import {Injectable} from '@angular/core';
import {Notice} from "../models/notice";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  constructor(private http:HttpClient) { }

  getNotice(type: string): Observable<Notice> {
    let queryParas = new HttpParams().set("type", type);
    return this.http.get<Notice>("notice/", {params: queryParas});
  }
}
