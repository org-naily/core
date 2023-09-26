import { Type } from "./common.typing";

declare global {
  interface IComponent {
    providers?: Type[];
  }
}

export {};
