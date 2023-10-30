import { Configuration } from "../decorators/configuration.decorator";
import { NConfigure } from "../typings/value.typing";

@Configuration()
export class NailyConfigure implements NConfigure {
  getConfigurationObject() {
    return {};
  }
}
