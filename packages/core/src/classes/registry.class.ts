import "reflect-metadata";
import { Jexl } from "jexl";

export class NailyRegistry {
  public static readonly jexlInstance = new Jexl();
  public static readonly map = new Map<string | symbol, NIOC.Element>();
}
