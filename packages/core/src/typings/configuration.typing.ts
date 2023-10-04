export interface INailyConfig {
  /**
   * 程序运行入口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @type {string}
   * @memberof INailyConfig
   */
  entry: string;

  /**
   * 扫描的目录 支持glob
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @type {string}
   * @memberof INailyConfig
   */
  scan: string;
}
