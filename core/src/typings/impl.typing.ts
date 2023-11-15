import JEXL from "jexl";

export interface NConfigure {
  getConfigure(jexl: string, builder: typeof JEXL): Promise<any> | any;
}
