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
  if (obj === undefined || obj === null || typeof obj !== "object") {
    throw new Error(`Expected object but actually found ${obj}`);
  } else {
    return {
      age: opt(() => unmarshalNumber(obj.age)),
      firstName: unmarshalString(obj.firstName),
      lastName: unmarshalString(obj.lastName),
    };
  }
}

function unmarshalArray<T>(as: any, unmarshalT: (a: any) => T): T[] {
  if (as === undefined || as === null || !Array.isArray(as)) {
    throw new Error(`Expected array but actually found ${as}`);
  } else {
    return as.map((a) => unmarshalT(a));
  }
}

function unmarshalString(a: any): string {
  if (a === undefined || a === null || typeof a !== "string") {
    throw new Error(`Expected string but actually found ${a}`);
  } else {
    return a as string;
  }
}

function unmarshalNumber(a: any): number {
  if (a === undefined || a === null || typeof a !== "number") {
    throw new Error(`Expected number but actually found ${a}`);
  } else {
    return a as number;
  }
}

function unmarshalBoolean(a: any): boolean {
  if (a === undefined || a === null || typeof a !== "boolean") {
    throw new Error(`Expected boolean but actually found ${a}`);
  } else {
    return a as boolean;
  }
}

function opt<T>(f: () => T): T | undefined {
  try {
    return f();
  } catch (e) {
    return undefined;
  }
}
