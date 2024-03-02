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
