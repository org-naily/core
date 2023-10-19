export function Readonly<T extends any>(val?: T) {
  return (target: Object, propertyKey: string | symbol) => {
    if (val) target[propertyKey] = val;
    Object.defineProperty(target, propertyKey, {
      writable: false,
    });
  };
}
