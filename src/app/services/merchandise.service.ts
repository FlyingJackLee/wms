import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../models/merchandise';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type MerchandisesQuery = 
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

  getAllMerchandies(page:number, limit:number): Observable<MerchandisesQuery> {
    const dataSource:MerchandisesQuery = {
      count: merchandises.length,
      merchandises: merchandises.slice(page * limit, page * limit + limit )
    }
    return of(dataSource);
  }


  searchMerchandies(text: string, page:number, limit:number): Observable<Merchandise[]> {
    let queryParames = new HttpParams();
    queryParames =  queryParames.append("q", text);
    queryParames =  queryParames.append("_page", page);
    queryParames =  queryParames.append("_limit", limit);
    return this.http.get<Merchandise[]>(this.url, {params: queryParames});
  }
}


const merchandises =[
  {
    "me_id": 3,
    "cate_id": 33,
    "category": {
      "cate_id": 33,
      "parent_cate_id": 12,
      "name": "A2",
      "level": 1,
      "owner_id": 0
    },
    "cost": 1599,
    "or_price": 1799,
    "imei": "123456789012345",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 5,
    "cate_id": 33,
    "category": {
      "cate_id": 33,
      "parent_cate_id": 12,
      "name": "A2",
      "level": 1,
      "owner_id": 0
    },
    "cost": 1599,
    "or_price": 1799,
    "imei": "123456789012346",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 6,
    "cate_id": 33,
    "category": {
      "cate_id": 33,
      "parent_cate_id": 12,
      "name": "A2",
      "level": 1,
      "owner_id": 0
    },
    "cost": 1599,
    "or_price": 1799,
    "imei": "123456789012347",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 7,
    "cate_id": 33,
    "category": {
      "cate_id": 33,
      "parent_cate_id": 12,
      "name": "A2",
      "level": 1,
      "owner_id": 0
    },
    "cost": 1599,
    "or_price": 1799,
    "imei": "123456789012348",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 10,
    "cate_id": 33,
    "category": {
      "cate_id": 33,
      "parent_cate_id": 12,
      "name": "A2",
      "level": 1,
      "owner_id": 0
    },
    "cost": 1599,
    "or_price": 1799,
    "imei": "123456789012349",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 65,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "000456789012349",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 66,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890900",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 67,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890901",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 68,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890902",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 69,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890903",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 70,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890904",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 71,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890905",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 72,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890906",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 73,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890907",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 74,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890908",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 75,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890909",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 76,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890910",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 77,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890911",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 78,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890912",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 79,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890913",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 80,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890914",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 81,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890915",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 82,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890916",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 83,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890917",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 84,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890918",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 85,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890919",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 86,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890920",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 87,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890921",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 88,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890922",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 89,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890923",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 90,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890924",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 91,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890925",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 92,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890926",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 93,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890927",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 94,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890928",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 95,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890929",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 96,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890930",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 97,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890931",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 98,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890932",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 99,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890933",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 100,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890934",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 101,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890935",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 102,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890936",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 103,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890937",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 104,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890938",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 105,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890939",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 106,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890940",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 107,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890941",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 108,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890942",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 109,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890943",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 110,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890944",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 111,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890945",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 112,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890946",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 113,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890947",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 114,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890948",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 115,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890949",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 116,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890950",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 117,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890951",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 118,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890952",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 119,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890953",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 120,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890954",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 121,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890955",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 122,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890956",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 123,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890957",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 124,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890958",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 125,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890959",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 126,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890960",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 127,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890961",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 128,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890962",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 129,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890963",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 130,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890964",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 131,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890965",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 132,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890966",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 133,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890967",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 134,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890968",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 135,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890969",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 136,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890970",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 137,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890971",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 138,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890972",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 139,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890973",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 140,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890974",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 141,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890975",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 142,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890976",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 143,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890977",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 144,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890978",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 145,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890979",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 146,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890980",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 147,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890981",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 148,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890982",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 149,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890983",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 150,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890984",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 151,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890985",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 152,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890986",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 153,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890987",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 154,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890988",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 155,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890989",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 156,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890990",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 157,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890991",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 158,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890992",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 159,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890993",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 160,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890994",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 161,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890995",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 162,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890996",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 163,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890997",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 164,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890998",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 165,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567890999",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 166,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891000",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 167,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891001",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 168,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891002",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 169,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891003",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 170,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891004",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 171,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891005",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 172,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891006",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 173,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891007",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 174,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891008",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 175,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891009",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 176,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891010",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 177,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891011",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 178,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891012",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 179,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891013",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 180,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891014",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 181,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891015",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 182,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891016",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 183,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891017",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 184,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891018",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 185,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891019",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 186,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891020",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 187,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891021",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 188,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891022",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 189,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891023",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 190,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891024",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 191,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891025",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 192,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891026",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 193,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891027",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 194,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891028",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 195,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891029",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 196,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891030",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 197,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891031",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 198,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891032",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 199,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891033",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 200,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891034",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 201,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891035",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 202,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891036",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 203,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891037",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 204,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891038",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 205,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891039",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 206,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891040",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 207,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891041",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 208,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891042",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 209,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891043",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 210,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891044",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 211,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891045",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 212,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891046",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 213,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891047",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 214,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891048",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 215,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891049",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 216,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891050",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 217,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891051",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 218,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891052",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 219,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891053",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 220,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891054",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 221,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891055",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 222,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891056",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 223,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891057",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 224,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891058",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 225,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891059",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 226,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891060",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 227,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891061",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 228,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891062",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 229,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891063",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 230,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891064",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 231,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891065",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 232,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891066",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 233,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891067",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 234,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891068",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 235,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891069",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 236,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891070",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 237,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891071",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 238,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891072",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 239,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891073",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 240,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891074",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 241,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891075",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 242,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891076",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 243,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891077",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 244,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891078",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 245,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891079",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 246,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891080",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 247,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891081",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 248,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891082",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 249,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891083",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 250,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891084",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 251,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891085",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 252,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891086",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 253,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891087",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 254,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891088",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 255,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891089",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 256,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891090",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 257,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891091",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 258,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891092",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 259,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891093",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 260,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891094",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 261,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891095",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 262,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891096",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 263,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891097",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 264,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891098",
    "number": 1,
    "status": 0,
    "userid": 0
  },
  {
    "me_id": 265,
    "cate_id": 56,
    "category": {
      "cate_id": 56,
      "parent_cate_id": 5,
      "name": "邦华",
      "level": 1,
      "owner_id": 0
    },
    "cost": 150,
    "or_price": 199,
    "imei": "1234567891099",
    "number": 1,
    "status": 0,
    "userid": 0
  }
]