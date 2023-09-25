/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 18:50:54
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 18:53:38
 * @FilePath: /v5/packages/core/src/utils/rmDir.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { readdirSync, rmdirSync, unlinkSync, existsSync, statSync } from "fs";
import { join } from "path";

export function deleteDirSync(url: string) {
  var files = [];
  if (existsSync(url)) {
    //判断给定的路径是否存在
    files = readdirSync(url); //返回文件和子目录的数组
    files.forEach(function (file, index) {
      var curPath = join(url, file);
      if (statSync(curPath).isDirectory()) {
        //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDirSync(curPath);
      } else {
        unlinkSync(curPath); //是指定文件，则删除
      }
    });
    rmdirSync(url); //清除文件夹
  }
}
