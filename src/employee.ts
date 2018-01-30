export interface Employee {
  company?: Company;
  firstName: string;
  lastName: string;
}

export interface Company {
  name: string;
  public?: boolean;
  size?: number;
}

export function parseEmployee(json: string): Employee {
  const obj = JSON.parse(json);
  return unmarshalEmployee(obj);
}

export function unmarshalEmployee(obj: any): Employee {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    throw new Error(`Expected object but actually found ${obj}`);
  } else {
    return {
      company: opt(() => unmarshalCompany(obj.company)),
      firstName: unmarshalString(obj.firstName),
      lastName: unmarshalString(obj.lastName),
    };
  }
}

export function parseCompany(json: string): Company {
  const obj = JSON.parse(json);
  return unmarshalCompany(obj);
}

export function unmarshalCompany(obj: any): Company {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    throw new Error(`Expected object but actually found ${obj}`);
  } else {
    return {
      name: unmarshalString(obj.name),
      public: opt(() => unmarshalBoolean(obj.public)),
      size: opt(() => unmarshalNumber(obj.size)),
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
