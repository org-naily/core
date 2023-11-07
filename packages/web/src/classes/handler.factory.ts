import { NailyFactory, Type } from "@naily/core";
import { IHttpMethod, NExpAdapter, NFilter, NPipe } from "../typings";
import { NailyWebWatermark } from "../constants";
import { NContainer } from "@naily/core/dist/cjs/typings/container.typing";

export class NailyExpWebHandler<Request = any, Response = any, NextFunction = Function> {
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

  private async initFilter(filters: Type<NFilter>[], options: NExpAdapter.HandlerOptions, error: Error) {
    filters.forEach((filter) => {
      const errorInstance = Reflect.getMetadata(NailyWebWatermark.FILTER, filter);
      if (errorInstance instanceof error.constructor || errorInstance === error.constructor) {
        const filterInstance = NailyFactory.container.getClassElementByTokenOrThrow<NFilter>(
          NailyFactory.pipe(filter).getMetadataOrThrow().token
        ).instance;
        return filterInstance.catch(error, {
          getResponse: () => options.res,
          getRequest: () => options.req,
        });
      }

      if (!errorInstance) {
        const filterInstance = NailyFactory.container.getClassElementByTokenOrThrow<NFilter>(
          NailyFactory.pipe(filter).getMetadataOrThrow().token
        ).instance;
        return filterInstance.catch(error, {
          getResponse: () => options.res,
          getRequest: () => options.req,
        });
      }
    });
  }

  public init(path: string, method: IHttpMethod, element: NContainer.ClassElement<Object>, methodPropertykey: string | symbol) {
    const pipe = NailyFactory.pipe(element.target);
    const methodParamtypes = pipe.getParamtypesByPropertykey(methodPropertykey);
    const parameter: NPipe.PipeMetadata[] = Reflect.getMetadata(NailyWebWatermark.PARAMETER, element.target.prototype, methodPropertykey) || [];
    const filters: Type<NFilter>[] = Reflect.getMetadata(NailyWebWatermark.USEFILTER, element.target.prototype, methodPropertykey) || [];

    this.adapter.handler(path, method, async (options): Promise<NExpAdapter.HandlerReturn> => {
      try {
        const param = await this.initPipe(parameter, options, methodParamtypes);
        return {
          body: element.instance[methodPropertykey](...param),
          haveError: false,
        };
      } catch (error) {
        return {
          body: this.initFilter(filters, options, error),
          haveError: true,
        };
      }
    });
  }
}
