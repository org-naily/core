import { NToken } from "../typings";
import { NContainer } from "../typings/container.typing";

export class NailyBaseContainer implements NContainer {
  protected readonly container = new Map<NToken, NContainer.Element>();

  getMap(): Map<NToken, NContainer.Element> {
    return this.container;
  }

  public getElementByToken(token: NToken) {
    return this.container.get(token);
  }

  public getElementByTokenOrThrow(token: NToken) {
    const element = this.getElementByToken(token);
    if (!element) throw new Error(`Element with token ${String(token)} not found`);
    return element;
  }

  hasElement(token: NToken): boolean {
    return this.container.has(token);
  }

  clear(): void {
    this.container.clear();
  }
}
