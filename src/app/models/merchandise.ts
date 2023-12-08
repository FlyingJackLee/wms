import { Category } from "./category";

export interface Merchandise {
    me_id: number;
    category: Category,
    cost: number,
    or_price: number,
    imei: string,
    number: number,
    status: number,
    userid: number
}
