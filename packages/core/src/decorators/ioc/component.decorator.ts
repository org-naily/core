import { WATERMARK } from "../../constants/watermark.constant";
import { ComponentContainer } from "../../containers/component.container";
import { NailyLifeCircle, RxType } from "../../typings";
import { generateKey } from "../../utils/generate";

export function Component(metadata: Partial<IComponent> = { id: generateKey() }) {
  if (!metadata.id) metadata.id = generateKey();

  return (target: RxType<NailyLifeCircle>) => {
    Reflect.defineMetadata(WATERMARK.COMPONENT, metadata, target);
    new ComponentContainer().create(target);
  };
}
