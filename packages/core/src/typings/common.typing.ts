export interface NailyLifeCircle {
  /**
   * [ZH] handleInit生命周期
   * 该生命周期将在该Injectable被new过了之后调用。此时，能获取到的是被依赖注入的、`没有new过的类`。
   * 你可以对其进行各种读操作，写操作也是允许的，但是始终会在下一个`handleMount`生命周期中被程序内部覆盖掉。
   * 这个时候获取到的是该类的`static静态方法`
   *
   * [EN] handleInit Life Circle
   * This life cycle will be called after the Injectable has been new. At this time, what can be obtained is the class that has been injected and `not new`.
   * You can perform various read operations on it, and write operations are also allowed, but it will always be overwritten by the program internally in the next `handleMount` life cycle.
   * At this time, what is obtained is the `static static method` of the class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @memberof NailyLifeCircle
   */
  handleInit?(): void;

  /**
   * [ZH] handleMount生命周期
   * 该生命周期将在该Injectable被new过了之后调用。此时，能获取到的是被依赖注入的、`new过的类`。这也代表着这个服务已经初始化完毕了。
   * 你可以对其进行各种读、写操作，因为内部已经不会再更改这个类了。
   *
   * [EN] handleMount Life Circle
   * This life cycle will be called after the Injectable has been new. At this time, what can be obtained is the class that has been injected and `new`.
   * You can perform various read and write operations on it, because naily will no longer change it.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @memberof NailyLifeCircle
   */
  handleMount?(): void;
}

export interface INailyApplication {
  /**
   * [ZH] 排除文件路径
   * [EN] Exclude file path
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @type {string}
   * @memberof INailyApplication
   */
  exclude: string[];

  /**
   * [ZH] 扫描的文件夹 支持glob路径
   * [EN] Scanned folder supports glob path
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @type {string}
   * @memberof INailyApplication
   */
  scan: string;
}
