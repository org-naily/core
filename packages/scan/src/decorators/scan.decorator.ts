import { NailyScanContainer } from "../containers/scan.container.js";
import { INailyInjectableScanner } from "../typings/common.typing.js";
import { RxType } from "@naily/core";

export function InjectableScan(target: RxType<INailyInjectableScanner>) {
  NailyScanContainer.add(target);
}
