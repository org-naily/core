export class TestError extends Error {
  constructor(msg: string, readonly twd: string) {
    super(msg);
    console.log(twd);
  }
}
