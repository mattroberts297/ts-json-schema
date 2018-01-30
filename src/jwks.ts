export interface JwkSet {
  keys: Jwk[];
}

export interface Jwk {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use?: string;
}

export function parseJwkSet(json: string): JwkSet {
  const obj = JSON.parse(json);
  return unmarshalJwkSet(obj);
}

export function unmarshalJwkSet(obj: any): JwkSet {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    throw new Error(`Expected object but actually found ${obj}`);
  } else {
    return {
      keys: unmarshalArray(obj.keys, unmarshalJwk),
    };
  }
}

export function parseJwk(json: string): Jwk {
  const obj = JSON.parse(json);
  return unmarshalJwk(obj);
}

export function unmarshalJwk(obj: any): Jwk {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    throw new Error(`Expected object but actually found ${obj}`);
  } else {
    return {
      alg: unmarshalString(obj.alg),
      e: unmarshalString(obj.e),
      kid: unmarshalString(obj.kid),
      kty: unmarshalString(obj.kty),
      n: unmarshalString(obj.n),
      use: opt(() => unmarshalString(obj.use)),
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
