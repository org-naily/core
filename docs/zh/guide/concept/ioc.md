# 注入

## 简介

管理类之间的依赖关系，以及类的生命周期，是 Naily 的核心功能。和`nest.js`等框架一样，您在写业务的时候，基本上用不到`new`关键字，所有的类都是通过`注入`的方式来使用的。这里涉及到三个装饰器：

- `@Injectable()`，类装饰器，仅仅用于用于标记一个类为可注入的类；被标记的类不会被`工厂`自动加入到`Naily容器`中。
- `@Inject()`，属性装饰器，用于标记一个参数为可注入的参数。被标记的参数会被自动注入。
- `@Autowired`，属性装饰器，是`@Inject()`的快捷方式，会自动获取类的类型并注入进`Naily容器`。仅在 TypeScript 的 tsconfig.json 中开启了 `emitDecoratorMetadata` 才能使用。

```json {4}
{
  "compilerOptions": {
    "experimentalDecorators": true, // 开启装饰器
    "emitDecoratorMetadata": true // 开启装饰器元数据
  }
}
```

逻辑其实很简单，直接上示例代码：

```typescript
import { Injectable, Autowired, Inject } from "@naily/core";

@Injectable()
class AService {
  getHello() {
    return "hello world";
  }
}

@Injectable()
class BService {
  @Autowired
  private readonly a: AService; // 这里标注的是参数的类型 而不是参数的new之后的值哦

  @Inject(AService)
  private readonly app: AService; // 这里也一样

  public getHello() {
    const hello = this.a.getHello(); // hello world
    const hello2 = this.app.getHello(); // 同样是 hello world
  }
}
```

## 限制

被`@Injectable()`标记的类，构造函数`constructor`必须全部都是`可注入的类`，否则会报错。

```typescript
@Injectable()
class BService {}

@Injectable()
class AService {
  constructor(
    private readonly b: BService, // BService是一个可注入的类 所以这里是正确的
    private readonly c: string // string类型不是一个可注入的类 会报错
  ) {}
}
```

## 疑问

那我应该优先用`@Autowired`注入，还是`@Inject`注入，还是`constructor`注入呢？

答案是：`constructor`注入 > `@Autowired`注入 > `@Inject`注入。

### Constructor 注入

三种注入方式是有区别的：

`constructor`注入方式可以在`constructor`构造函数中直接拿到值，但是`@Autowired`和`@Inject`注入方式只能在`constructor`构造函数被调用之后才能拿到值。举个例子：

```typescript
@Injectable()
class AService {}

@Injectable()
class BService {
  @Autowired
  private readonly a: AService;

  @Inject(AService)
  private readonly app: AService;

  constructor(private readonly b: AService) {
    console.log(this.a); // undefined 拿不到AService 因为constructor还没执行完
    console.log(this.app); // undefined 拿不到AService 因为constructor还没执行完
    console.log(this.b); // AService {} 正常拿到AService类
  }

  getHello() {
    console.log(this.a); // AService {} 正常拿到AService类
    console.log(this.app); // AService {} 正常拿到AService类
    console.log(this.b); // AService {} 正常拿到AService类
  }
}
```

### Autowired 和 Inject 注入

`@Autowired`和`@Inject`注入方式是一样的，但是`@Autowired`会自动获取参数的类型并进行注入，无需手动传入参数类型，而`@Inject`需要手动传入参数类型。

## 总结

好像也没学到些什么东西，但是`注入`是建立在`Naily容器工厂`上的`所有的基础`，后面的内容都是基于这些东西的，所以一定要理解透彻。
