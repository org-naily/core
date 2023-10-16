# Decorator

## @Injectable

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

## @Inject

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

## @Autowired

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

## @NailyApplication

### Description

The `@NailyApplication` decorator marks a class as a naily IOC application. It will `transform TypeScript AST` and scan the files automatically to find all `@Injectable` classes and inject them.

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
