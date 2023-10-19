# @Value <Badge type="tip" text="Property Decorator" />

## 说明

`@Value` 装饰器用于注入配置文件`naily.config.json`中的值。

## 参数

- jexl: <Badge type="tip" text="string" /> <Badge type="warning" text="必填" /> jexl 表达式。详情请参考[jexl](https://github.com/TomFrost/jexl)。
- dynamic: <Badge type="tip" text="boolean" /> 是否自动动态更新值。默认为`false`。

## 使用

```json
// naily.config.json
{
  "text": "Hello World"
}
```

```typescript{5}
import { Injectable, Value } from "@naily/core";

@Injectable()
export class MyService {
  @Value("text")
  private text: string;

  public myMethod() {
    return this.text; // Hello World
  }
};
```
