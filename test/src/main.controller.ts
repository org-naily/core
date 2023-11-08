import { Autowired } from "@naily/core";
import { MainService } from "./main.service.js";
import { MainFilter } from "./main.filter.js";
import { Controller, Get, Param, UseFilters } from "@naily/web";

@Controller()
export class MainController {
  @Autowired
  private readonly mainService: MainService;

  @Get(":id")
  @UseFilters(MainFilter)
  public getHello(@Param("id", MainService) param: number) {
    return this.mainService.getHello();
  }
}
