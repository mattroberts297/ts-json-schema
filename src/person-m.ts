export interface Person {
  firstName: string;
  lastName: string;
  age?: number;
}

export function unmarshalPerson(obj: any): Person {
  return {
    firstName: unmarshalString(obj, "firstName"),
    lastName: unmarshalString(obj, "lastName"),
    age: opt(() => unmarshalNumber(obj, "age"))
  };
}

function unmarshalString(obj: any, key: string): string {
  if (obj[key] === undefined || typeof obj[key] !== "string") {
    throw new Error(`Expected value of type string at key: ${key}`);
  } else {
    return <string> obj[key];
  }
}

function unmarshalNumber(obj: any, key: string): number {
  if (obj[key] === undefined || typeof obj[key] !== "number") {
    throw new Error(`Expected value of type number at key: ${key}`);
  } else {
    return <number> obj[key];
  }
}

function unmarshalBoolean(obj: any, key: string): boolean {
  if (obj[key] === undefined || typeof obj[key] !== "boolean") {
    throw new Error(`Expected value of type boolean at key: ${key}`);
  } else {
    return <boolean> obj[key];
  }
}

function opt<T>(thunk: () => T): T | undefined {
  try {
    return thunk();
  } catch(e) {
    return undefined;
  }
}
