import { NRepository } from "@/typings/repository.typing";
import { Injectable, NToken } from "..";

@Injectable()
export class NailyRepository {
  private static readonly _repository = new Map<NToken, NRepository.Element<any>>();

  public static get repository() {
    return this._repository;
  }

  public static get<T>(token: NToken): NRepository.Element<T> | undefined {
    return this.repository.get(token);
  }

  public static set<T>(element: NRepository.Element<T>) {
    this.repository.set(element.options.token, element);
  }
}
