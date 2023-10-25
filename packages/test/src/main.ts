import { Autowired, Injectable, NailyFactoryRepository } from "@naily/core";

@Injectable("TestService")
export class TestService {}

@Injectable("MainService")
export class MainService {
  @Autowired
  private readonly testService: TestService;
}

console.log(NailyFactoryRepository.getContext().all());
