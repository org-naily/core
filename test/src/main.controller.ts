import { Autowired } from "@naily/core";
import { MainService } from "./main.service.js";
import { MainFilter } from "./main.filter.js";
import { Controller, Get, Query, UseFilters } from "@naily/web";

@Controller()
export class MainController {
  @Autowired
  private readonly mainService: MainService;

  @Get()
  @UseFilters(MainFilter)
  public getHello(@Query("id", MainService) id: number) {
    return this.mainService.getHello();
  }
}
