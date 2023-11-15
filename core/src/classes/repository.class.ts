import { NToken, NRepository } from "@/typings";
import { Injectable } from "@/decorators";

@Injectable()
export class NailyRepository {
  private static readonly repository = new Map<NToken, NRepository.Element<any>>();

  public static getRepository() {
    return this.repository;
  }

  public static get<T>(token: NToken): NRepository.Element<T> | undefined {
    return this.repository.get(token);
  }

  public static set<T>(element: NRepository.Element<T>) {
    this.repository.set(element.options.token, element);
  }
}
