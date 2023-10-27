# 概念

## 核心概念

在这章，我们将详细解剖 Naily 的各个细节。我们将从一些简单的东西开始，之后我们将深入到一些更复杂的东西。

首先，Naily 的核心，就是`一切皆是类`。而管理类们的`类`，就称`工厂`。

`工厂`是一个`单例`，它的作用是管理所有的`类`；在`Naily工厂`里，存在一个`Map`容器，我们通过一个`自动生成的token`字符串（或者自行指定的`token`）来保存类的引用。以下的所有概念，都是基于这个`Naily容器工厂`而建立的。

接下来，我们将详细讲解 Naily 主库中的各个围绕着`Naily容器工厂`而衍生出的概念，以及它们的作用。

## 核心语法

哪怕是你的 TypeScript 水平半斤八两，照样能轻松能学会它。

核心语法其实就是 TypeScript 的`装饰器`，在 Java 中被称为`注解`，在 C#中被称为`特性`。它们的作用都是一样的，就是为类、方法、属性等等添加一些额外的信息，以便于在运行时进行一些操作。

```typescript {1,3,6}
@Injectable() // 这个@Injectable()就是装饰器 它装饰了TestService类
export class TestService {
  @Autowired // 这个是在属性上面的装饰器 它装饰了anotherService属性
  private readonly anotherService: AnotherService;

  @Before() // 这个是在方法上面的装饰器 它装饰了testMethod方法
  testMethod() {}
}
```

大概就是这样，可以说这样写出来的代码既规范，又非常清晰易懂。我们暂且不讨论这装饰器的用法，我们只需要知道，它们就是`核心语法`，就是`Naily`的灵魂所在。
