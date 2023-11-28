import sp from "synchronized-promise";
import { ValidatorService } from "../services";
import { NailyFactory, Type } from "@org-naily/core";
import { ValidationError } from "class-validator";

export function ValidateProperty(validationClass: Type, listener?: (errors: ValidationError[]) => void) {
  return (target: Object, propertykey: string | symbol) => {
    const service = new NailyFactory(ValidatorService).createInstance();
    const errors = sp(service.validate)(target[propertykey], validationClass);
    if (listener) {
      listener(errors);
    } else {
      if (errors.length > 0) throw service.getFirstError(errors[0]);
    }
  };
}
