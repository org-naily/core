# 注入

Naily的核心功能之一，就是IOC容器注入。这个用过`Spring`，`nest.js`的都应该很熟悉了。在`Naily`中，和其他框架一样，通过这几个装饰器，就能实现依赖注入的所有功能。

## @Injectable

标识一个类为可注入的类。

> 和下面的`@Configuration`不同的是，此注解仅是标注一下，除非你在其他Injectable里注入过此类，否则这个Injectable永远不可能被发现。

### 签名

```typescript
function Injectable<T>(injectableOptions?: Partial<NIOC.InjectableOptions>): ClassDecorator;
```

### 参数

- `NIOC.InjectableOptions`：

```typescript
type NToken = string | symbol;

const enum ScopeEnum {
  SINGLETON, // 单例，默认值
  PROTOTYPE, // 每次调用创建一个新单例
}

interface InjectableOptions {
  Token: NToken; // Injectable Token, 可为string | symbol类型，默认自动生成
  Scope: ScopeEnum; // 作用域
}
```

## @Service

目前这个注解的功能和`@Injectable`是一样的，传入的参数也是一样的，主要是用这个的话比较容易区分具体的业务逻辑类。

### 签名

与`@Injectable`相同。

### 参数

与`@Injectable`相同。

## @Configuration

这个注解是`@Injectable`的扩展，会在该装饰器执行的时候立即将该类加入到`仓库`中。

### 签名

与`@Injectable`相同。

### 参数

与`@Injectable`相同。
