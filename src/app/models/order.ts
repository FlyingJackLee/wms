import {Merchandise} from "./merchandise";

export interface Order {
  id: number;
  merchandise: Merchandise;
  sellingPrice: number;
  remark: string;
  sellingTime: Date;
  returned: boolean;
}
