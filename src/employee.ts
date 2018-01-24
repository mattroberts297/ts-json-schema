export interface Employee {
  company?: Company;
  firstName: string;
  lastName: string;
}

export interface Company {
  name: string;
  size?: number;
}

export function parseEmployee(json: string): Employee {
  const obj = JSON.parse(json);
  return unmarshalEmployee(obj);
}

export function unmarshalEmployee(obj: any): Employee {
  return {
    company: opt(() => unmarshalCompany(obj.company)),
    firstName: unmarshalString(obj, "firstName"),
    lastName: unmarshalString(obj, "lastName"),
  };
}

export function parseCompany(json: string): Company {
  const obj = JSON.parse(json);
  return unmarshalCompany(obj);
}

export function unmarshalCompany(obj: any): Company {
  return {
    name: unmarshalString(obj, "name"),
    size: opt(() => unmarshalNumber(obj, "size")),
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
