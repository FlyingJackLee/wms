import { Category } from "./category";

export interface Merchandise {
    id: number;
    category: Category,
    cost: number,
    price: number,
    imei: string,
    sold: boolean,
    createTime: Date
}

export interface MeCount {
  count: number,
  sumCost: number,
  sumPrice: number,
  category: Category
}
