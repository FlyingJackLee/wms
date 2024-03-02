import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  batchOrder(orders: Order[] ){
    return this.http.post("order/batch", orders);
  }

  getOrdersByDateRange(start: Date, end: Date) {
    let endOptimized = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
    let queryParas = new HttpParams().set("start", start.getTime()).set("end", endOptimized.getTime());
    return this.http.get<Order[]>('order/range', { params: queryParas});
  }

  returnOrder(orderId: number) {
    return this.http.put('order/return/' + orderId, null);
  }
}
