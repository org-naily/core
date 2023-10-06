import { dirname } from "path";
import { mkdir, writeFile } from "fs";

// 定义一个函数，根据路径重写某个文件
export function rewriteFile(filePath: string, content: string, message?: string) {
  return new Promise<true>((res, rej) => {
    // 使用path.dirname方法，获取文件所在的文件夹路径
    const dirPath = dirname(filePath);
    // 使用fs.mkdir方法，如果文件夹不存在则创建该文件夹，如果文件夹已存在则不做任何操作
    mkdir(dirPath, { recursive: true }, (err) => {
      // 如果发生错误，打印错误信息
      if (err) {
        console.error(err);
        rej(err);
      } else {
        // 否则，使用fs.writeFile方法，如果文件不存在则创建一个新文件，如果文件已存在则重写该文件
        writeFile(filePath, content, (err) => {
          // 如果发生错误，打印错误信息
          if (err) {
            console.error(err);
            rej(err);
          } else {
            // 否则，打印成功信息
            if (message) console.log(message);
            res(true);
          }
        });
      }
    });
  });
}
