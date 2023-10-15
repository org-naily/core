import * as md5 from "md5";

export const GenerateKey = () => md5(Math.random().toString() + new Date());
