# 控制器

在核心中，就已经有了控制器的概念。在`@naily/web`包中，已经实现了`控制器`。使用它很简单：

```typescript {3}
import { Controller } from "@naily/web";

@Controller()
export class AppController {
  // ...
}
```

使用`@Controller`装饰器的同时，会将该类添加到`Naily容器工厂`中，相当于使用了`@Injectable`。

标记为`@Controller`的类同时也`不再允许`使用`@Injectable`。
