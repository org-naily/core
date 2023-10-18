# AOP

## INailyBeanAfterExecute

该接口用于在类函数执行完毕后执行一些操作。

```typescript
export interface INailyBeanAfterExecute {
  afterExecute(): void | Promise<void>;
}
```
