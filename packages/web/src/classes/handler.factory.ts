import { NailyFactory, Type } from "@naily/core";
import { IHttpMethod, NExpAdapter, NPipe } from "../typings";
import { NailyWebWatermark } from "../constants";
import { NContainer } from "@naily/core/dist/cjs/typings/container.typing";

export class NailyExpWebHandler {
  constructor(private readonly adapter: NExpAdapter) {}

  private async initPipe(parameter: NPipe.PipeMetadata[], options: NExpAdapter.HandlerOptions, methodParamtypes: Type[]) {
    const param = [];
    for (const i in parameter) {
      let parsedParamValue = parameter[i].key ? options.params[parameter[i].key] : options.params;
      for (const pipeItem of parameter[i].pipes) {
        const { token } = NailyFactory.pipe(pipeItem).getMetadataOrThrow();
        const pipeInstance = NailyFactory.container.getClassElementByTokenOrThrow<NPipe>(token).instance;
        const value = await pipeInstance.transform(parsedParamValue, {
          key: parameter[i].key,
          type: methodParamtypes[i],
          user: parameter[i].user,
        });
        parsedParamValue = value;
      }
      param[i] = parsedParamValue;
    }
    return param;
  }

  public init(path: string, method: IHttpMethod, element: NContainer.ClassElement<Object>, methodPropertykey: string | symbol) {
    const parameter: NPipe.PipeMetadata[] = Reflect.getMetadata(NailyWebWatermark.PIPE, element.target.prototype, methodPropertykey) || [];
    const pipe = NailyFactory.pipe(element.target);
    const methodParamtypes = pipe.getParamtypesByPropertykey(methodPropertykey);

    this.adapter.handler(path, method, async (options) => {
      try {
        const pipe = await this.initPipe(parameter, options, methodParamtypes);
        return element.instance[methodPropertykey](...pipe);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
