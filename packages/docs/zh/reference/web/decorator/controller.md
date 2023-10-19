# 控制器

## @Controller

### 说明

`@Controller` 用于标记一个类为控制器类。该类中的所有方法都会被自动注册为路由处理器。

### 参数

- `path`：<Badge type="tip" text="string" /> 控制器的路径前缀。默认为 `/`。

### 使用

```ts
import { Controller, Get } from "@naily/web";

@Controller()
export class APIController {
  @Get("/user")
  async getUser() {
    return "hello world";
  }
}
```
