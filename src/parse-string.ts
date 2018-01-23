export function parseString(obj: any, key: string): string {
  if (obj[key] === undefined || typeof obj[key] !== "string") {
    throw new Error(`Expected value of type string at key: ${key}`);
  } else {
    return <string> obj[key];
  }
}
