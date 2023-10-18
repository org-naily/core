# Decorator

## @Injectable <Badge type="tip" text="Class Decorator" />

### Description

The `@Injectable` decorator marks a class as available to be provided and injected as a naily dependency.

### Usage

```typescript{3}
import { Injectable } from "@naily/core";

@Injectable()
export class MyService {
  // ...
};
```

### Note

The `@Injectable` class's constructor only can have another `@Injectable` class as parameter.

## @Inject <Badge type="tip" text="Property Decorator" />

### Description

The `@Inject` decorator marks a class as available to be injected as a dependency.

### Usage

```typescript{5}
import { Injectable, Inject } from "@naily/core";

@Injectable()
export class MyService {
  @Inject(MyOtherService)
  private readonly myOtherService: MyOtherService
};
```

### Note

The `@Inject` decorator only can be used in `@Injectable` class，and only can inject another `@Injectable` class.

## @Autowired <Badge type="tip" text="Property Decorator" />

### Description

The `@Autowired` decorator marks a class as available to be injected as a dependency. It is a alias of `@Inject`: it will be get the property type to inject automatically.

### Usage

```typescript{6}
import { Injectable, Autowired } from "@naily/core";

@Injectable()
export class MyService {
  // It will be inject MyOtherService automatically
  @Autowired
  private readonly myOtherService: MyOtherService
};
```

### Note

The `@Autowired` decorator only can be used in `@Injectable` class，and only can inject another `@Injectable` class.

## @NailyApplication <Badge type="tip" text="Class Decorator" />

### Description

The `@NailyApplication` decorator marks a class as a naily IOC application. It will `scan the files automatically` and `transform TypeScript AST` to find all `@Injectable` classes and inject them.

### Usage

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

### Note

When execute this file, they will transform AST and change output file. So you should execute this file `before` execute the entry file.

## @Before <Badge type="tip" text="Method Decorator" />

### Description

The `@Before` decorator will `modify the prototype chain` of the class, so it will be executed before the method.

### Parameters

- before: `Type<INailyBeanBeforeExecute>[]`. The `INailyBeanBeforeExecute` is a interface, it has a method `beforeExecute` which will be executed before the method.

### Usage

```typescript{5}
import { Injectable, Before, INailyBeanBeforeExecute } from "@naily/core";

@Injectable()
export class ListenService implments INailyBeanBeforeExecute {
  beforeExecute() {
    console.log("Before execute");
  }
}

@Injectable()
export class MyService {
  @Before([MyBeforeExecute])
  public myMethod() {
    // ...
  }
};
```

### Note

- The `@Before` decorator only can be used in `@Injectable` class，if you manual to new the class, the `@Before` decorator will `not work`.
- Static method will `not work` with `@Before` decorator.

## @After <Badge type="tip" text="Method Decorator" />

### Description

The `@After` decorator will `modify the prototype chain` of the class, so it will be executed after the method.

### Parameters

- after: `Type<INailyBeanAfterExecute>[]`. The `INailyBeanAfterExecute` is a interface, it has a method `afterExecute` which will be executed after the method.

### Usage

```typescript{5}
import { Injectable, After, INailyBeanAfterExecute } from "@naily/core";

@Injectable()
export class ListenService implments INailyBeanAfterExecute {
  afterExecute() {
    console.log("After execute");
  }
}

@Injectable()
export class MyService {
  @After([MyAfterExecute])
  public myMethod() {
    // ...
  }
};
```

### Note

- The `@After` decorator only can be used in `@Injectable` class，if you manual to new the class, the `@After` decorator will `not work`.
- Static method will `not work` with `@After` decorator.
