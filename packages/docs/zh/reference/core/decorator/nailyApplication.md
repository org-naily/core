# @NailyApplication <Badge type="tip" text="Class Decorator" />

## 说明

The `@NailyApplication` decorator marks a class as a naily IOC application. It will `scan the files automatically` and `transform TypeScript AST` to find all `@Injectable` classes and inject them.

## 使用

```typescript{3}
import { NailyApplication } from "@naily/core";

@NailyApplication({
    // The entry file of the application
    entry: "./src/main.ts",
    // The files to scan. It will be used as `glob` pattern
    scan: "./src/**/*.ts"
})
export class MyApplication {};
```

## 注意

中文：当执行这个文件时，它会转换 TypeScript AST 并更改`entry`内指定的那个文件。所以你应该在开启 Web 服务器等适配器层的操作之前之前执行这个文件。
