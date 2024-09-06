type ErrorParams = Parameters<ErrorConstructor>;

export function raise(...params: ErrorParams): never {
  throw new Error(...params);
}
