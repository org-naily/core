import { Type } from "./typings";

declare global {
  export interface IComponent {
    id: string;
    providers: Type[];
  }
}
