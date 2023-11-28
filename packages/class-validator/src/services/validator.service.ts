import { Bean, Service, Type } from "@org-naily/core";
import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

@Service
export class ValidatorService {
  @Bean()
  public getFirstError(error: ValidationError): ValidationError {
    if (error.constraints) return error;
    if (error.children) return this.getFirstError(error.children[0]);
  }

  @Bean()
  public async validate<T>(value: T, validationClass: Type) {
    const transformed = plainToInstance(validationClass, value);
    return await validate(transformed);
  }
}
