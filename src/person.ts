export interface Person {
  age?: number;
  firstName: string;
  lastName: string;
}

export function parsePerson(json: string): Person {
  const obj = JSON.parse(json);
  return unmarshalPerson(obj);
}

export function unmarshalPerson(obj: any): Person {
  return {
    age: opt(() => unmarshalNumber(obj, "age")),
    firstName: unmarshalString(obj, "firstName"),
    lastName: unmarshalString(obj, "lastName"),
  };
}

function unmarshalString(obj: any, key: string): string {
  if (obj[key] === undefined || typeof obj[key] !== "string") {
    throw new Error(`Expected value of type string at key: ${key}`);
  } else {
    return obj[key] as string;
  }
}

function unmarshalNumber(obj: any, key: string): number {
  if (obj[key] === undefined || typeof obj[key] !== "number") {
    throw new Error(`Expected value of type number at key: ${key}`);
  } else {
    return obj[key] as number;
  }
}

function unmarshalBoolean(obj: any, key: string): boolean {
  if (obj[key] === undefined || typeof obj[key] !== "boolean") {
    throw new Error(`Expected value of type boolean at key: ${key}`);
  } else {
    return obj[key] as boolean;
  }
}

function opt<T>(thunk: () => T): T | undefined {
  try {
    return thunk();
  } catch (e) {
    return undefined;
  }
}
